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

@Catch(Error, HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const status = exception instanceof HttpException 
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
      
    const exceptionResponse = exception instanceof HttpException
      ? exception.getResponse()
      : exception.message;

    const errorName = exception.constructor.name;
    const errorMapping = errorMappings[errorName];

    response.status(status).json({
      code: status,
      error_code: errorMapping?.errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
      error_detail: exceptionResponse['message'] || exceptionResponse,
      data: null,
    });
  }
}