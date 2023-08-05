import { JwtPayload } from './../../common/types';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponseModel } from '../types';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { ResponseHandler } from '../../utils/response-handler';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): LoginResponseModel {
    const user = await this.usersService.findOneOrThrowUser({
      where: { email: loginDto.email },
    });

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = await this.jwtService.signAsync({
      email: loginDto.email,
      uuid: user.uuid,
    } as JwtPayload);

    return ResponseHandler.success(
      { email: loginDto.email, token },
      'Logged in successfully',
      HttpStatus.OK,
    );
  }
}
