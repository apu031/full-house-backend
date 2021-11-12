import { ApiProperty } from '@nestjs/swagger';

export class CreateHandRequestDto {
  @ApiProperty({
    description: 'Number of players in the game',
    type: 'number',
  })
  numberOfPlayers: number;
}
