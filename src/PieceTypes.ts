import { Piece } from "./Piece";

export const colours = ["green", "red", "blue", "yellow", "purple", "orange"];

export class LinePiece extends Piece {
  constructor() {
    super();
    this.colour = colours[Math.floor(Math.random() * colours.length)];
    this.squares = [
      { xPosition: 0, yPosition: 0, width: 25, height: 25 },
      { xPosition: 0, yPosition: 25, width: 25, height: 25 },
      { xPosition: 0, yPosition: 50, width: 25, height: 25 },
      { xPosition: 0, yPosition: 75, width: 25, height: 25 },
    ];
  }
}

export class SquarePiece {}
