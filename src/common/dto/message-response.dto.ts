import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ example: 'User with id abc123 deleted' })
  message!: string;
}
