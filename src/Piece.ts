interface PieceSquare {
  xPos: number;
  yPos: number;
}

interface ForbiddenSquare extends PieceSquare {
  colour: string;
}

type Position = PieceSquare[];

class Piece {
  colour: string;
  // TODO implement getter and setter methods instead of accessing position and positions directly
  position: number;
  positions: Position[];
  type:
    | "IPiece"
    | "JPiece"
    | "LPiece"
    | "OPiece"
    | "SPiece"
    | "TPiece"
    | "ZPiece";
}

export { PieceSquare, ForbiddenSquare, Piece };
