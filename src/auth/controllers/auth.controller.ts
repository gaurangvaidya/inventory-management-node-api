import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponseModel } from '../types';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('')
  async login(@Body() loginDto: LoginDto): LoginResponseModel {
    return this.authService.login(loginDto);
  }
}
