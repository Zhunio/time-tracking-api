import { ApiProperty } from '@nestjs/swagger';

class TimeTrackerUserSummaryDto {
  @ApiProperty({ example: 'clz8v2v9u0000abcd1234efgh' })
  id!: string;

  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'John' })
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  lastName!: string;
}

export class TimeTrackerResponseDto {
  @ApiProperty({ example: 'clz8v3f6z0001abcd9876mnop' })
  id!: string;

  @ApiProperty({ example: 'clz8v2v9u0000abcd1234efgh' })
  userId!: string;

  @ApiProperty({ example: '2026-02-16T00:00:00.000Z' })
  date!: Date;

  @ApiProperty({ example: '09:00' })
  startTime!: string;

  @ApiProperty({ example: '17:00' })
  endTime!: string;

  @ApiProperty({ example: '2026-02-16T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-02-16T00:00:00.000Z' })
  updatedAt!: Date;

  @ApiProperty({ type: TimeTrackerUserSummaryDto })
  user!: TimeTrackerUserSummaryDto;
}
