export const SUITS = ['♠', '♥', '♦', '♣'];
export const NUMBERS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'K',
  'Q',
];

export class Card {
  private readonly suit: string;
  private readonly number: string;
  constructor(suit, number) {
    this.suit = suit;
    this.number = number;
  }

  getSuit = (): string => {
    return this.suit;
  };

  getNumber = (): string => {
    return this.number;
  };
}
