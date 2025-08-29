import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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

  async login(loginUserDto: UserLoginDto) {
    const { email } = loginUserDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Email not found!');
    }
    return user;
  }
}
