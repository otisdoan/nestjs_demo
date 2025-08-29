import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/register.dto';
import { UserLoginDto } from './dto/login.dto';
import { HttpCode } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: UserRegisterDto) {
    const user = await this.authService.register(createUserDto);
    return {
      status: 'success',
      message: 'Register successfully!',
      data: user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: UserLoginDto) {
    const user = await this.authService.login(loginUserDto);
    return {
      status: 'success',
      message: 'Login successfully!',
      data: user,
    };
  }
}
