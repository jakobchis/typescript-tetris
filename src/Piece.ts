import { ORIENTATIONS, PIECE_TYPES } from "./utils";
import { cloneDeep } from "lodash";

interface PieceSquare {
  xPos: number;
  yPos: number;
}

interface ForbiddenSquare extends PieceSquare {
  colour: string;
}

type Orientation = PieceSquare[];

class Piece {
  type: typeof PIECE_TYPES[number];
  colour: string;
  orientationIndex: number;
  orientations: Orientation[];

  constructor(
    type: typeof PIECE_TYPES[number],
    colour: string,
    orientationIndex: number
  ) {
    this.type = type;
    this.colour = colour;
    this.orientationIndex = orientationIndex;
    this.orientations = cloneDeep(ORIENTATIONS[type]);
  }

  getCurrentOrientation = () => {
    return this.orientations[this.orientationIndex];
  };

  getOrientation = (index: number) => {
    return this.orientations[index];
  };

  getOrientations = () => {
    return this.orientations;
  };

  getNextOrientationIndex = () => {
    if (this.orientationIndex + 1 < this.orientations.length) {
      return this.orientationIndex + 1;
    }

    return 0;
  };

  setOrientation = (index: number) => {
    this.orientationIndex = index;
  };
}

export { PieceSquare, ForbiddenSquare, Piece, Orientation };
