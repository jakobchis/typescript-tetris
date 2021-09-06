import { Piece } from "./Piece";
import { getRandomColor } from "./utils";
export class LinePiece extends Piece {
  constructor() {
    super();
    this.colour = getRandomColor();
    this.squares = [
      {
        xPosition: 0,
        yPosition: 0,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPosition: 0,
        yPosition: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPosition: 0,
        yPosition: 50,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPosition: 0,
        yPosition: 75,
        width: 25,
        height: 25,
        colour: this.colour,
      },
    ];
  }
}

export class SquarePiece {}
