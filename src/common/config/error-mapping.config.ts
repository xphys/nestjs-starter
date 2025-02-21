import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/error-codes.enum';

interface ErrorMapping {
  status: number;
  errorCode: ErrorCode;
  message: string;
}

export const errorMappings: { [key: string]: ErrorMapping } = {
  UserNotFoundException: {
    status: HttpStatus.NOT_FOUND,
    errorCode: ErrorCode.USER_NOT_FOUND,
    message: 'User not found',
  },
  BadRequestException: {
    status: HttpStatus.BAD_REQUEST,
    errorCode: ErrorCode.BAD_REQUEST,
    message: 'Bad request',
  },
  // Add more error mappings as needed
}; 