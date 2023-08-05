import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserResponse } from '../types';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ResponseHandler } from '../../utils/response-handler';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto): CreateUserResponse {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    await this.userRepository.insert({
      email: createUserDto.email,
      password: hashedPassword,
      uuid: randomUUID(),
    });

    return ResponseHandler.success(
      { email: createUserDto.email },
      'User created success',
      HttpStatus.OK,
    );
  }

  async findOneOrThrowUser(options: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
