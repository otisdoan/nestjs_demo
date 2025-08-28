import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async register(createUserDto: UserRegisterDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }
}
