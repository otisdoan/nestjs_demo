import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() createUserDto: UserRegisterDto) {
    const user = await this.authService.register(createUserDto);
    return {
      status: 'success',
      message: 'Đăng ký thành công',
      data: user,
    };
  }
}
