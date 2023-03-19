import { PIECE_TYPES } from "./utils";
import { cloneDeep } from "lodash";
import { PieceSquare } from "./PieceSquare";
import { IMAGES } from "../assets/assets";
import { ORIENTATIONS } from "./orientations";

class Piece {
  type;
  colour;
  orientationIndex;
  orientations;
  squares;
  isQueuedPiece;

  constructor(
    type: typeof PIECE_TYPES[number],
    colour: keyof typeof IMAGES,
    isQueuedPiece: boolean
  ) {
    this.type = type;
    this.colour = colour;
    this.orientationIndex = 0;
    this.isQueuedPiece = isQueuedPiece;
    this.orientations = cloneDeep(ORIENTATIONS[type]).map((orientation) =>
      orientation.map((pieceSquare) => {
        const xPos = !this.isQueuedPiece
          ? pieceSquare.xPos + 100
          : pieceSquare.xPos;
        return new PieceSquare(xPos, pieceSquare.yPos, this.colour);
      })
    );
    this.squares = this.orientations[this.orientationIndex];
  }

  getNextOrientationIndex() {
    if (this.orientationIndex + 1 < this.orientations.length) {
      return this.orientationIndex + 1;
    }

    return 0;
  }

  draw(context: CanvasRenderingContext2D) {
    this.squares.forEach((square: PieceSquare) => square.draw(context));
  }
}

export { Piece };
