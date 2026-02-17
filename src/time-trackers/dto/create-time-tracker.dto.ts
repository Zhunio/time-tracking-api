import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeTrackerDto {
  @ApiProperty({ example: 'clz8v2v9u0000abcd1234efgh' })
  userId!: string;

  @ApiProperty({ example: '2026-02-16T00:00:00.000Z' })
  date!: string;

  @ApiProperty({ example: '09:00' })
  startTime!: string;

  @ApiProperty({ example: '17:00' })
  endTime!: string;
}
