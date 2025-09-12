import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../../entities/user.entity';
import { Token } from '../../entities/token.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { password_hash, ...userData } = registerDto;

    // Check if user exists
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email is already registered!');
    }

    if (userData.phone) {
      const existingPhone = await this.userService.findByPhone(userData.phone);
      if (existingPhone) {
        throw new ConflictException('Phone is already registered!');
      }
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const user = this.userRepository.create({
      email: userData.email,
      passwordHash: hashedPassword,
      phone: userData.phone,
      fullName: userData.full_name,
    });

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto, res: Response): Promise<any> {
    const { phone, password_login } = loginDto;

    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Phone number is not registered!');
    }

    const isPasswordValid = await bcrypt.compare(
      password_login,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      res,
    );

    await this.saveToken(tokens);

    return {
      id: user.id,
      role: user.role,
      ...tokens,
    };
  }

  async loginWithGoogle(
    googleLoginDto: GoogleLoginDto,
    res: Response,
  ): Promise<any> {
    const { token } = googleLoginDto;

    try {
      const googleUser = await this.getGoogleUserInfo(token);

      let user = await this.userService.findByEmail(googleUser.email);
      if (!user) {
        // Create new user from Google data
        user = this.userRepository.create({
          email: googleUser.email,
          fullName: googleUser.name,
          avatarUrl: googleUser.picture,
          passwordHash: await bcrypt.hash(Math.random().toString(36), 10), // Random password
          emailVerified: true,
        });
        user = await this.userRepository.save(user);
      }

      const tokens = await this.generateTokens(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        res,
      );

      await this.saveToken(tokens);

      return {
        ...user,
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  async refreshToken(refreshToken: string, res: Response): Promise<any> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      const payload = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      const tokens = await this.generateTokens(payload, res);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(payload: any, res: Response): Promise<any> {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1d'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    // Set cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async saveToken(tokens: any): Promise<void> {
    const token = this.tokenRepository.create({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
    await this.tokenRepository.save(token);
  }

  private async getGoogleUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
      );
      const userInfo = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      return userInfo;
    } catch (error) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}
