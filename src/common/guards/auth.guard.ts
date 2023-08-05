import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    let token = request.header('Authorization');
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    token = token.replace('Bearer ', '');
    try {
      const jwtPayload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request['user'] = jwtPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
