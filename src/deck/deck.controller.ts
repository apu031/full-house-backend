import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateHandRequestDto } from '../dtos/create-hand-request.dto';
import { DeckService } from './deck.service';
import { Card } from '../entities/card.entity';
import { Hand } from '../entities/hand.entity';

@ApiTags('Deck')
@Controller('deck')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Get('get-deck')
  @ApiOperation({
    summary: 'Get the deck of shuffled cards',
  })
  async getDeckOfCards(): Promise<Card[]> {
    return this.deckService.regularShuffle();
  }

  @Post('create-hands')
  @ApiOperation({
    summary: 'Create number of hands',
  })
  @ApiBody({
    type: CreateHandRequestDto,
  })
  async createHands(@Body() createHandRequestDto: CreateHandRequestDto) {
    this.deckService.createHands(createHandRequestDto.numberOfPlayers);
  }

  @Get('get-deal')
  @ApiOperation({
    summary: 'Get the full house deal for all the hands',
  })
  async getDeal(): Promise<Hand[]> {
    return this.deckService.getDeal();
  }

  @Get('is-full-house/:playerNumber')
  @ApiOperation({
    summary: 'Get if the current hand is a full house',
  })
  @ApiParam({
    name: 'playerNumber',
  })
  async getFullHouse(
    @Param('playerNumber') playerNumber: number,
  ): Promise<boolean> {
    const hand = await this.deckService.getHandByPlayerNumber(playerNumber);
    return hand.checkFullHouse();
  }

  @Get('is-pairs/:playerNumber')
  @ApiOperation({
    summary: 'Get if the current hand is a pair',
  })
  @ApiParam({
    name: 'playerNumber',
  })
  async getPairs(
    @Param('playerNumber') playerNumber: number,
  ): Promise<boolean> {
    const hand = await this.deckService.getHandByPlayerNumber(playerNumber);
    return hand.getPairs();
  }

  @Get('is-three-of-a-kind/:playerNumber')
  @ApiOperation({
    summary: 'Get if the current hand is a three of a kind',
  })
  @ApiParam({
    name: 'playerNumber',
  })
  async getThreeOfAKind(
    @Param('playerNumber') playerNumber: number,
  ): Promise<boolean> {
    const hand = await this.deckService.getHandByPlayerNumber(playerNumber);
    return hand.getThreeOfAKind();
  }
}
