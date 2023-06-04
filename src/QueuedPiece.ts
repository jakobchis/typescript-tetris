import { IMAGES } from "../assets/assets";
import { Piece } from "./Piece";
import { PieceSquare } from "./PieceSquare";
import { PIECE_TYPES } from "./utils";
import { ORIENTATIONS } from "./orientations";

class QueuedPiece extends Piece {
  constructor(type: (typeof PIECE_TYPES)[number], colour: keyof typeof IMAGES) {
    const squares = ORIENTATIONS[type][0].map((pieceSquare) => {
      return new PieceSquare(pieceSquare.xPos, pieceSquare.yPos, colour);
    });

    super(type, colour, squares);
  }
}

export { QueuedPiece };
