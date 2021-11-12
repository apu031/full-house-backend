import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeckService } from './deck/deck.service';
import { DeckController } from './deck/deck.controller';

@Module({
  imports: [],
  controllers: [AppController, DeckController],
  providers: [AppService, DeckService],
})
export class AppModule {}
