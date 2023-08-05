import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorObj =
      process.env.NODE_ENV !== 'local'
        ? exception.name
        : { error: exception.name, stack: exception.stack };

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        status: exception.getStatus(),
        message: exception.message,
        data: [],
        error: errorObj,
      });
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something Went Wrong',
      data: [],
      error: 'Internal Server Error',
    });
  }
}
