import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { errorMappings } from '../config/error-mapping.config';
import { ErrorCode } from '../constants/error-codes.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    
    // Get the error name from the exception
    const errorName = exception.constructor.name;
    const errorMapping = errorMappings[errorName];

    response.status(status).json({
      code: status,
      message: exception.message,
      error_code: errorMapping?.errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
} 