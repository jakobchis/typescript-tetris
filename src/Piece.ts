import { ORIENTATIONS, PIECE_TYPES } from "./utils";
import { cloneDeep } from "lodash";
import { PieceSquare } from "./PieceSquare";

class Piece {
  type;
  colour;
  orientationIndex;
  orientations;

  constructor(
    type: typeof PIECE_TYPES[number],
    colour: string,
    orientationIndex: number
  ) {
    this.type = type;
    this.colour = colour;
    this.orientationIndex = orientationIndex;
    this.orientations = cloneDeep(ORIENTATIONS[type]).map((orientation) =>
      orientation.map(
        (pieceSquare) =>
          new PieceSquare(pieceSquare.xPos, pieceSquare.yPos, this.colour)
      )
    );
  }

  getCurrentOrientation() {
    return this.orientations[this.orientationIndex];
  }

  getOrientation(index: number) {
    return this.orientations[index];
  }

  getOrientations() {
    return this.orientations;
  }

  getNextOrientationIndex() {
    if (this.orientationIndex + 1 < this.orientations.length) {
      return this.orientationIndex + 1;
    }

    return 0;
  }

  setOrientation(index: number) {
    this.orientationIndex = index;
  }

  draw(context: CanvasRenderingContext2D) {
    this.getCurrentOrientation().forEach((square: PieceSquare) =>
      square.draw(context)
    );
  }
}

export { Piece };
