import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: 25, description: 'The age of the user' })
  age: number;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe', description: 'The name of the user' })
  name?: string;

  @ApiPropertyOptional({ example: 'john@example.com', description: 'The email of the user' })
  email?: string;

  @ApiPropertyOptional({ example: 25, description: 'The age of the user' })
  age?: number;
} 