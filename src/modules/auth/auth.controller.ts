import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/register.dto';
import { UserLoginDto } from './dto/login.dto';
import { HttpCode } from '@nestjs/common';
import { errorResponse, successResponse } from 'src/common/utils/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.authService.getUserById(id);
      return successResponse('Get user successfully!', user);
    } catch (error) {
      return errorResponse(error);
    }
  }

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
