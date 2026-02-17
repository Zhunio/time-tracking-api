import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'secret' })
  password!: string;

  @ApiProperty({ example: 'John' })
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  lastName!: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  dateOfBirth!: string;

  @ApiPropertyOptional({ example: false })
  isAdmin?: boolean;
}
