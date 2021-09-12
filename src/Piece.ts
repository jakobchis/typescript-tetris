type PieceSquare = {
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  colour: string;
};

export type CenterPoint = {
  xPosition: number;
  yPosition: number;
}

export class Piece {
  colour: string;
  squares: Array<PieceSquare>;
  centerPoint: CenterPoint;
}
