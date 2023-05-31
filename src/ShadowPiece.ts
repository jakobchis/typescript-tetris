import { Piece } from "./Piece";
import { PieceSquare } from "./PieceSquare";
import { MAIN_CANVAS_DIMENSIONS, SQUARE_DIMENSION } from "./utils";

class ShadowPiece extends Piece {
  constructor(basePiece: Piece) {
    super(basePiece.type, "shadow", false);

    this.orientations = basePiece.orientations;
    this.squares = basePiece.squares.map((square) => {
      return new PieceSquare(
        square.xPos,
        square.yPos + MAIN_CANVAS_DIMENSIONS.height - SQUARE_DIMENSION * 2,
        this.colour
      );
    });
  }

  checkOffScreen(newSquares: PieceSquare[]) {
    return newSquares.find((square) => {
      return square.xPos < 0 || square.xPos > 275;
    });
  }

  checkCollision(newSquares: PieceSquare[], forbiddenSquares: PieceSquare[]) {
    return newSquares.find((square) => {
      return (
        square.yPos > 525 ||
        square.yPos < 0 ||
        forbiddenSquares.find((forbiddenSquare) => {
          return (
            forbiddenSquare.yPos === square.yPos &&
            forbiddenSquare.xPos === square.xPos
          );
        })
      );
    });
  }

  moveToNextPosition(
    newSquares: PieceSquare[],
    forbiddenSquares: PieceSquare[]
  ) {
    // Drop the shadow piece to the bottom of the grid to display
    while (!this.checkCollision(newSquares, forbiddenSquares)) {
      newSquares.forEach((square) => (square.yPos += SQUARE_DIMENSION));
    }
    while (this.checkCollision(newSquares, forbiddenSquares)) {
      newSquares.forEach((square) => (square.yPos -= SQUARE_DIMENSION));
    }

    this.squares = newSquares;
  }

  update(
    direction: "up" | "down" | "left" | "right",
    forbiddenSquares: PieceSquare[]
  ) {
    if (direction === "up") {
      this.orientationIndex = this.getNextOrientationIndex();
      let newSquares = this.orientations[this.orientationIndex].map(
        (square) => {
          return new PieceSquare(square.xPos, square.yPos, this.colour);
        }
      );

      this.moveToNextPosition(newSquares, forbiddenSquares);
    } else if (direction === "down") {
      return;
    } else if (direction === "left") {
      let newSquares = this.squares.map((square) => {
        return new PieceSquare(
          square.xPos - SQUARE_DIMENSION,
          square.yPos,
          this.colour
        );
      });

      if (this.checkOffScreen(newSquares)) {
        return;
      }

      this.moveToNextPosition(newSquares, forbiddenSquares);
    } else if (direction === "right") {
      let newSquares = this.squares.map((square) => {
        return new PieceSquare(
          square.xPos + SQUARE_DIMENSION,
          square.yPos,
          this.colour
        );
      });

      if (this.checkOffScreen(newSquares)) {
        return;
      }

      this.moveToNextPosition(newSquares, forbiddenSquares);
    }
  }
}

export { ShadowPiece };
