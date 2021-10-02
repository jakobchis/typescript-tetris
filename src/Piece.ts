type PieceSquare = {
  xPos: number;
  yPos: number;
  width: number;
  height: number;
  colour: string;
};

type CenterPoint = {
  xPos: number;
  yPos: number;
};

class Piece {
  colour: string;
  squares: Array<PieceSquare>;
  centerPoint: CenterPoint;
  type: "LinePiece" | "LPiece" | "SquarePiece";
}

export { CenterPoint, PieceSquare, Piece };
