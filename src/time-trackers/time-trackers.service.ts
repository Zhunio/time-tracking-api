import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeTrackerDto } from './dto/create-time-tracker.dto';
import { UpdateTimeTrackerDto } from './dto/update-time-tracker.dto';

const timeTrackerSelect = {
  id: true,
  userId: true,
  date: true,
  startTime: true,
  endTime: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  },
} satisfies Prisma.TimeTrackerSelect;

@Injectable()
export class TimeTrackersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTimeTrackerDto: CreateTimeTrackerDto) {
    try {
      return await this.prisma.timeTracker.create({
        data: {
          userId: createTimeTrackerDto.userId,
          date: new Date(createTimeTrackerDto.date),
          startTime: createTimeTrackerDto.startTime,
          endTime: createTimeTrackerDto.endTime,
        },
        select: timeTrackerSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, createTimeTrackerDto.userId);
    }
  }

  async findAll() {
    return this.prisma.timeTracker.findMany({
      select: timeTrackerSelect,
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const timeTracker = await this.prisma.timeTracker.findUnique({
      where: { id },
      select: timeTrackerSelect,
    });

    if (!timeTracker) {
      throw new NotFoundException(`Time tracker with id ${id} not found`);
    }

    return timeTracker;
  }

  async update(id: string, updateTimeTrackerDto: UpdateTimeTrackerDto) {
    try {
      return await this.prisma.timeTracker.update({
        where: { id },
        data: {
          userId: updateTimeTrackerDto.userId,
          date: updateTimeTrackerDto.date
            ? new Date(updateTimeTrackerDto.date)
            : undefined,
          startTime: updateTimeTrackerDto.startTime,
          endTime: updateTimeTrackerDto.endTime,
        },
        select: timeTrackerSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, updateTimeTrackerDto.userId, id);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.timeTracker.delete({ where: { id } });
      return { message: `Time tracker with id ${id} deleted` };
    } catch (error) {
      this.handlePrismaError(error, undefined, id);
    }
  }

  private handlePrismaError(
    error: unknown,
    userId?: string,
    timeTrackerId?: string,
  ): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003' && userId) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      if (error.code === 'P2025' && timeTrackerId) {
        throw new NotFoundException(
          `Time tracker with id ${timeTrackerId} not found`,
        );
      }
    }

    throw new InternalServerErrorException('Unexpected database error');
  }
}
