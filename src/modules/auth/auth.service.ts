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

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async register(createUserDto: UserRegisterDto): Promise<User> {
    const existUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existUser) {
      throw new BadRequestException('Email already exists!');
    }
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async login(loginUserDto: UserLoginDto): Promise<User> {
    const { email } = loginUserDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Email not found!');
    }
    return user;
  }
}
