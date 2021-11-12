import { Card } from './card.entity';

export class Hand {
  public cards: Card[] = [];
  public hasPairs: boolean;
  public hasThreeOfAKind: boolean;
  public hasFullHouse: boolean;

  countCards = () => {
    const map = new Map();
    this.cards.forEach((card) => {
      if (map.has(card.getNumber())) {
        map.set(card.getNumber(), map.get(card.getNumber()) + 1);
      } else {
        map.set(card.getNumber(), 1);
      }
    });
    return map;
  };

  getThreeOfAKind = (): boolean => {
    const map = this.countCards();
    for (const value of map.values()) {
      if (value === 3) {
        this.hasThreeOfAKind = true;
        return true;
      }
    }
    this.hasThreeOfAKind = false;
    return false;
  };

  getPairs = (): boolean => {
    const map = this.countCards();
    for (const value of map.values()) {
      if (value === 2) {
        this.hasPairs = true;
        return true;
      }
    }
    this.hasPairs = false;
    return false;
  };

  checkFullHouse = (): boolean => {
    this.getPairs();
    this.getThreeOfAKind();
    this.hasFullHouse = this.hasPairs && this.hasThreeOfAKind;
    return this.hasFullHouse;
  };
}
