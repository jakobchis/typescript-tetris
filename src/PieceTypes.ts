import { Piece } from "./Piece";
import { getRandomColor } from "./utils";
export class LinePiece extends Piece {
  constructor() {
    super();
    this.colour = getRandomColor();
    this.centerPoint = { xPosition: 25, yPosition: 50 };
    this.squares = [
      {
        xPosition: 0,
        yPosition: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPosition: 25,
        yPosition: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPosition: 50,
        yPosition: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPosition: 75,
        yPosition: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
    ];
  }
}

export class LPiece extends Piece {
  constructor() {
    super();
    this.colour = getRandomColor();
    this.centerPoint = { xPosition: 25, yPosition: 25 };
    this.squares = [
      {
        xPosition: 0,
        yPosition: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPosition: 25,
        yPosition: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPosition: 50,
        yPosition: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPosition: 50,
        yPosition: 0,
        width: 25,
        height: 25,
        colour: this.colour,
      },
    ];
  }
}

export class SquarePiece {}
