import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'new.user@example.com' })
  email!: string;

  @ApiProperty({ example: 'secret' })
  password!: string;

  @ApiProperty({ example: 'New' })
  firstName!: string;

  @ApiProperty({ example: 'User' })
  lastName!: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  dateOfBirth!: string;

  @ApiPropertyOptional({ example: false })
  isAdmin?: boolean;
}
