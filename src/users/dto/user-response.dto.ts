import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'clz8v2v9u0000abcd1234efgh' })
  id!: string;

  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'John' })
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  lastName!: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  dateOfBirth!: Date;

  @ApiProperty({ example: false })
  isAdmin!: boolean;

  @ApiProperty({ example: '2026-02-16T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-02-16T00:00:00.000Z' })
  updatedAt!: Date;
}
