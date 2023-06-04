import { PIECE_TYPES, SQUARE_DIMENSION } from "./utils";
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
  shadowSquares;
  isQueuedPiece;

  constructor(
    type: (typeof PIECE_TYPES)[number],
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
    this.shadowSquares = this.squares.map((square: PieceSquare) => {
      return new PieceSquare(square.xPos, square.yPos, "shadow");
    });
  }

  checkCollision(newSquares: PieceSquare[], forbiddenSquares: PieceSquare[]) {
    return newSquares.find((square) => {
      return (
        square.yPos > 525 ||
        square.yPos < 0 ||
        square.xPos < 0 ||
        square.xPos > 275 ||
        forbiddenSquares.find((forbiddenSquare) => {
          return (
            forbiddenSquare.yPos === square.yPos &&
            forbiddenSquare.xPos === square.xPos
          );
        })
      );
    });
  }

  dropPiece(forbiddenSquares: PieceSquare[]) {
    let dropping = true;
    let newSquares = cloneDeep(this.squares);

    while (dropping) {
      newSquares.forEach((square) => (square.yPos += SQUARE_DIMENSION));

      if (this.checkCollision(newSquares, forbiddenSquares)) {
        dropping = false;
        return;
      }

      this.orientations.forEach((position: any) => {
        position.forEach(
          (squarePosition: any) => (squarePosition.yPos += SQUARE_DIMENSION)
        );
      });
    }
  }

  getShadowSquares(forbiddenSquares: PieceSquare[]) {
    let dropping = true;
    let newSquares = cloneDeep(this.squares);

    while (dropping) {
      newSquares.forEach((square) => (square.yPos += SQUARE_DIMENSION));

      if (this.checkCollision(newSquares, forbiddenSquares)) {
        dropping = false;
        return;
      }

      this.shadowSquares = newSquares.map((square) => {
        return new PieceSquare(square.xPos, square.yPos, "shadow");
      });
    }
  }

  update(
    direction: "up" | "down" | "left" | "right",
    forbiddenSquares: PieceSquare[],
    handleNewPiece: (squares: PieceSquare[]) => void
  ) {
    if (direction === "up") {
      const nextOrientationIndex = this.getNextOrientationIndex();
      const newSquares = this.orientations[nextOrientationIndex];

      if (this.checkCollision(newSquares, forbiddenSquares)) {
        return;
      }

      this.orientationIndex = nextOrientationIndex;
      this.squares = newSquares;
    } else if (direction === "down") {
      const newSquares = this.squares.map((square: any) => {
        return new PieceSquare(
          square.xPos,
          square.yPos + SQUARE_DIMENSION,
          this.colour
        );
      });

      if (this.checkCollision(newSquares, forbiddenSquares)) {
        const squares = this.squares.map((squarePosition) => {
          return new PieceSquare(
            squarePosition.xPos,
            squarePosition.yPos,
            this.colour
          );
        });

        handleNewPiece(squares);
        return;
      }

      this.orientations.forEach((position: any) => {
        position.forEach(
          (squarePosition: any) => (squarePosition.yPos += SQUARE_DIMENSION)
        );
      });
    } else if (direction === "left") {
      const newSquares = this.squares.map((square: any) => ({
        ...square,
        xPos: square.xPos - SQUARE_DIMENSION,
      }));

      if (this.checkCollision(newSquares, forbiddenSquares)) {
        return;
      }

      this.orientations.forEach((position: any) => {
        position.forEach(
          (squarePosition: any) => (squarePosition.xPos -= SQUARE_DIMENSION)
        );
      });
    } else if (direction === "right") {
      const newSquares = this.squares.map((square: any) => ({
        ...square,
        xPos: square.xPos + SQUARE_DIMENSION,
      }));

      if (this.checkCollision(newSquares, forbiddenSquares)) {
        return;
      }

      this.orientations.forEach((position: any) => {
        position.forEach(
          (squarePosition: any) => (squarePosition.xPos += SQUARE_DIMENSION)
        );
      });
    }

    this.getShadowSquares(forbiddenSquares);
  }

  getNextOrientationIndex() {
    if (this.orientationIndex + 1 < this.orientations.length) {
      return this.orientationIndex + 1;
    }

    return 0;
  }

  draw(context: CanvasRenderingContext2D) {
    this.squares.forEach((square: PieceSquare) => square.draw(context));
    this.shadowSquares.forEach((square: PieceSquare) => square.draw(context));
  }
}

export { Piece };
