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
  // Add more error mappings as needed
}; 