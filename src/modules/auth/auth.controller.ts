import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.register(registerDto);
      const { passwordHash, ...result } = user;

      return res.status(201).json({
        success: true,
        message: 'Register successfully!',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(loginDto, res);

      return res.status(200).json({
        success: true,
        message: 'Login successfully!',
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('google')
  async loginWithGoogle(
    @Body(ValidationPipe) googleLoginDto: GoogleLoginDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.authService.loginWithGoogle(
        googleLoginDto,
        res,
      );
      const { passwordHash, ...userData } = result;

      return res.status(200).json({
        success: true,
        message: 'Login successfully!',
        data: userData,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.cookies.refresh_token;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'No refresh token provided',
        });
      }

      const tokens = await this.authService.refreshToken(refreshToken, res);

      return res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: tokens,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.status(200).json({
      success: true,
      message: 'Logout successfully',
    });
  }
}
