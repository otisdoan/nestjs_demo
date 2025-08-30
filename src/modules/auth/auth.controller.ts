import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/register.dto';
import { UserLoginDto } from './dto/login.dto';
import { HttpCode } from '@nestjs/common';
import { errorResponse, successResponse } from 'src/common/utils/response';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string, @Req() req: Request) {
    console.log(req?.user);
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
