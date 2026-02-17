import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTimeTrackerDto {
  @ApiPropertyOptional({ example: 'clz8v2v9u0000abcd1234efgh' })
  userId?: string;

  @ApiPropertyOptional({ example: '2026-02-16T00:00:00.000Z' })
  date?: string;

  @ApiPropertyOptional({ example: '09:00' })
  startTime?: string;

  @ApiPropertyOptional({ example: '17:00' })
  endTime?: string;
}
