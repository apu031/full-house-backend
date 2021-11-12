import { Injectable } from '@nestjs/common';
import { Hand } from '../entities/hand.entity';
import { Card, NUMBERS, SUITS } from '../entities/card.entity';

@Injectable()
export class DeckService {
  private cards: Card[];
  private hands: Hand[] = [];
  constructor() {
    this.reset();
  }

  createHands = (numberOfPlayers = 1) => {
    const hands = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      hands.push(new Hand());
    }
    return hands;
  };

  regularShuffle = (): Card[] => {
    this.reset();

    let currentIndex = this.cards.length - 1;
    let randomIndex = 0;
    while (currentIndex > -1) {
      randomIndex = Math.floor(Math.random() * currentIndex);

      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];

      currentIndex -= 1;
    }
    return this.cards;
  };

  getDeal = () => {
    this.regularShuffle();

    const numberOfPlayers = this.hands.length;
    for (let i = 0; i < numberOfPlayers * 5; i++) {
      this.hands[i % numberOfPlayers].cards.push(this.cards[i]);
    }

    this.hands.forEach((hand) => {
      hand.checkFullHouse();
    });
    return this.hands;
  };

  getHandByPlayerNumber = (playerNumber = 0) => {
    if (playerNumber > -1 || playerNumber < this.hands.length) {
      return this.hands[playerNumber];
    }
  };

  private createDeck = (): Card[] => {
    return SUITS.flatMap((suit) => {
      return NUMBERS.map((number) => {
        return new Card(suit, number);
      });
    });
  };

  private reset = () => {
    this.cards = this.createDeck();
    this.hands = this.createHands();
  };
}
