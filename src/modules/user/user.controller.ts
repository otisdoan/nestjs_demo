import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    const { passwordHash, ...result } = user;
    return {
      success: true,
      message: 'User created successfully',
      data: result,
    };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    const sanitizedUsers = users.map(({ passwordHash, ...user }) => user);
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: sanitizedUsers,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);
    const { passwordHash, ...result } = user;
    return {
      success: true,
      message: 'User retrieved successfully',
      data: result,
    };
  }

  @Get(':id/detail')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  async findOneDetail(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);
    const { passwordHash, ...result } = user;
    return {
      success: true,
      message: 'User detail retrieved successfully',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(id, updateUserDto);
    const { passwordHash, ...result } = user;
    return {
      success: true,
      message: 'User updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
