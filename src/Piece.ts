interface PieceSquare {
  xPos: number;
  yPos: number;
}

interface ForbiddenSquare extends PieceSquare {
  colour: string;
}

type Orientation = PieceSquare[];

class Piece {
  orientationIndex: number;
  orientations: Orientation[];
  colour: string;
  type:
    | "IPiece"
    | "JPiece"
    | "LPiece"
    | "OPiece"
    | "SPiece"
    | "TPiece"
    | "ZPiece";

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

export { PieceSquare, ForbiddenSquare, Piece };
