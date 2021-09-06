type PieceSquare = {
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  colour: string;
};

export class Piece {
  colour: string;
  squares: Array<PieceSquare>;
}
