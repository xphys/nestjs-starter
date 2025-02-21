import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1, description: 'The user ID' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'The user name' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The user email' })
  email: string;

  @ApiProperty({ example: 25, description: 'The user age' })
  age: number;
} 