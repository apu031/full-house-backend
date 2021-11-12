import { ApiProperty } from '@nestjs/swagger';

export class CardDto {
  @ApiProperty({
    description: 'Suit',
    type: 'string',
  })
  suit: string;

  @ApiProperty({
    description: 'Number',
    type: 'string',
  })
  number: string;
}
