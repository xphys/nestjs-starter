import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserNotFoundException } from '../../common/exceptions/user-not-found.exception';
import { User } from '@/models/user.model';

@Injectable()
export class UsersService {
  private users: any[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', isActive: false, createdAt: new Date(), updatedAt: new Date() }
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new UserNotFoundException(id);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };

    return this.users[userIndex];
  }

  remove(id: number): void {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new UserNotFoundException(id);
    }
    this.users.splice(userIndex, 1);
  }
} 