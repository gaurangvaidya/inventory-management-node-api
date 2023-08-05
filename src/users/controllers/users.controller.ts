import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserResponse } from '../types';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto): CreateUserResponse {
    return this.userService.createUser(createUserDto);
  }
}
