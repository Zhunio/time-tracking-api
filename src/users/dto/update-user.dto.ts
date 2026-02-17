import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'john@example.com' })
  email?: string;

  @ApiPropertyOptional({ example: 'secret' })
  password?: string;

  @ApiPropertyOptional({ example: 'John' })
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  lastName?: string;

  @ApiPropertyOptional({ example: '1990-01-01T00:00:00.000Z' })
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: false })
  isAdmin?: boolean;
}
