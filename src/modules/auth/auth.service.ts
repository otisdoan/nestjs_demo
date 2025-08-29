import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { UserLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/common/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async getUserById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async register(createUserDto: UserRegisterDto): Promise<User> {
    const { email, password } = createUserDto;
    const existUser = await this.userModel.findOne({
      email,
    });
    if (existUser) {
      throw new BadRequestException('Email already exists!');
    }

    const hashedPassword = await hashPassword(password);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return user.save();
  }

  async login(loginUserDto: UserLoginDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email }).lean();

    if (!user) {
      throw new BadRequestException('Email not found!');
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password is invalid!');
    }

    const accessToken = this.jwtService.sign(user, {
      secret: process.env.JWT_ACCESS_TOKEN,
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(user, {
      secret: process.env.JWT_REFRESH_TOKEN,
      expiresIn: '7d',
    });

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }
}
