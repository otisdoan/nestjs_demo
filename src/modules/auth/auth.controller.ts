import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/register.dto';
import { UserLoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() createUserDto: UserRegisterDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(createUserDto);

      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'Register successfully!',
        data: user,
      });
    } catch (error) {
      const err = error as Error;
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: UserLoginDto, @Res() res: Response) {
    try {
      const user = await this.authService.login(loginUserDto);

      return res.status(HttpStatus.FOUND).json({
        status: 'success',
        message: 'Register successfully!',
        data: user,
      });
    } catch (error) {
      const err = error as Error;
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: err.message,
      });
    }
  }
}
