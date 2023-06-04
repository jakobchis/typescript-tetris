import { PIECE_TYPES } from "./utils";
import { PieceSquare } from "./PieceSquare";
import { IMAGES } from "../assets/assets";

class Piece {
  type;
  colour;
  squares;

  constructor(
    type: (typeof PIECE_TYPES)[number],
    colour: keyof typeof IMAGES,
    squares: PieceSquare[]
  ) {
    this.type = type;
    this.colour = colour;
    this.squares = squares;
  }

  draw(context: CanvasRenderingContext2D) {
    this.squares.forEach((square: PieceSquare) => square.draw(context));
  }
}

export { Piece };
