import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  dateOfBirth: true,
  isAdmin: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          dateOfBirth: new Date(createUserDto.dateOfBirth),
          isAdmin: createUserDto.isAdmin ?? false,
        },
        select: userSelect,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: userSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          email: updateUserDto.email,
          password: updateUserDto.password,
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
          dateOfBirth: updateUserDto.dateOfBirth
            ? new Date(updateUserDto.dateOfBirth)
            : undefined,
          isAdmin: updateUserDto.isAdmin,
        },
        select: userSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { message: `User with id ${id} deleted` };
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  private handlePrismaError(error: unknown, id?: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException('A user with this email already exists');
      }

      if (error.code === 'P2025' && id) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
    }

    throw new InternalServerErrorException('Unexpected database error');
  }
}
