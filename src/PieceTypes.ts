import { Piece } from "./Piece";
import { getRandomColor } from "./utils";
class LinePiece extends Piece {
  constructor() {
    super();
    this.colour = getRandomColor();
    this.centerPoint = { xPos: 25, yPos: 50 };
    this.squares = [
      {
        xPos: 0,
        yPos: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPos: 25,
        yPos: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPos: 50,
        yPos: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPos: 75,
        yPos: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
    ];
  }
}

class LPiece extends Piece {
  constructor() {
    super();
    this.colour = getRandomColor();
    this.centerPoint = { xPos: 25, yPos: 25 };
    this.squares = [
      {
        xPos: 0,
        yPos: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPos: 25,
        yPos: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPos: 50,
        yPos: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPos: 50,
        yPos: 0,
        width: 25,
        height: 25,
        colour: this.colour,
      },
    ];
  }
}

class SquarePiece extends Piece {
  constructor() {
    super();
    this.colour = getRandomColor();
    this.centerPoint = { xPos: 25, yPos: 25 };
    this.squares = [
      {
        xPos: 0,
        yPos: 0,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPos: 0,
        yPos: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPos: 25,
        yPos: 0,
        width: 25,
        height: 25,
        colour: this.colour,
      },
      {
        xPos: 25,
        yPos: 25,
        width: 25,
        height: 25,
        colour: this.colour,
      },
    ];
  }
}

// TODO add the rest of the pieces

export { LinePiece, LPiece, SquarePiece };
