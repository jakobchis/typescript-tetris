import { Piece } from "./Piece";
import { PieceSquare } from "./PieceSquare";
import {
  EXTRA_INFO_CANVAS_DIMENSIONS,
  getRandomNewPiece,
  MAIN_CANVAS_DIMENSIONS,
} from "./utils";

class Game {
  currentPiece;
  queuedPiece: Piece;
  forbiddenSquares: PieceSquare[] = [];
  messages: string[];
  mainCtx;
  extraInfoCtx;

  constructor(
    initialPiece: Piece,
    mainCtx: CanvasRenderingContext2D,
    extraInfoCtx: CanvasRenderingContext2D
  ) {
    this.currentPiece = initialPiece;
    this.mainCtx = mainCtx;
    this.extraInfoCtx = extraInfoCtx;
  }

  update(direction: string) {
    if (direction === "up") {
      const newOrientation = this.currentPiece.getNextOrientationIndex();
      const newSquares = this.currentPiece
        .getOrientation(newOrientation)
        .map((square: any) => ({
          xPos: square.xPos,
          yPos: square.yPos,
        }));

      if (this.checkOutOfBounds(newSquares)) {
        return;
      }

      this.currentPiece.setOrientation(newOrientation);
    }

    if (direction === "down") {
      const newSquares = this.currentPiece
        .getCurrentOrientation()
        .map((square: any) => ({
          xPos: square.xPos,
          yPos: square.yPos + 25,
        }));

      if (this.checkOutOfBounds(newSquares)) {
        const squares = this.currentPiece
          .getCurrentOrientation()
          .map((squarePosition) => {
            return new PieceSquare(
              squarePosition.xPos,
              squarePosition.yPos,
              this.currentPiece.colour
            );
          });
        this.forbiddenSquares.push(...squares);

        const newPiece = getRandomNewPiece();
        this.currentPiece = newPiece;

        return;

        // if (isGameOver(newPiece.getCurrentOrientation())) {
        //   gameOver = true;
        // } else {
        //   this.currentPiece = newPiece;
        // }
      }

      this.currentPiece.getOrientations().forEach((position: any) => {
        position.forEach((squarePosition: any) => (squarePosition.yPos += 25));
      });
    }

    if (direction === "left") {
      const newSquares = this.currentPiece
        .getCurrentOrientation()
        .map((square: any) => ({
          ...square,
          xPos: square.xPos - 25,
        }));

      if (this.checkOutOfBounds(newSquares)) {
        return;
      }

      this.currentPiece.getOrientations().forEach((position: any) => {
        position.forEach((squarePosition: any) => (squarePosition.xPos -= 25));
      });
    }

    if (direction === "right") {
      const newSquares = this.currentPiece
        .getCurrentOrientation()
        .map((square: any) => ({
          ...square,
          xPos: square.xPos + 25,
        }));

      if (this.checkOutOfBounds(newSquares)) {
        return;
      }

      this.currentPiece.getOrientations().forEach((position: any) => {
        position.forEach((squarePosition: any) => (squarePosition.xPos += 25));
      });
    }
  }

  checkOutOfBounds(newSquares: { xPos: number; yPos: number }[]) {
    return newSquares.find((square) => {
      return (
        square.yPos > 525 ||
        square.yPos < 0 ||
        square.xPos < 0 ||
        square.xPos > 275 ||
        this.forbiddenSquares.find((forbiddenSquare) => {
          return (
            forbiddenSquare.yPos === square.yPos &&
            forbiddenSquare.xPos === square.xPos
          );
        })
      );
    });
  }

  draw() {
    this.mainCtx.fillStyle = "White";
    this.mainCtx.fillRect(
      0,
      0,
      MAIN_CANVAS_DIMENSIONS.width,
      MAIN_CANVAS_DIMENSIONS.height
    );
    this.extraInfoCtx.fillStyle = "White";
    this.extraInfoCtx.fillRect(
      0,
      0,
      EXTRA_INFO_CANVAS_DIMENSIONS.width,
      EXTRA_INFO_CANVAS_DIMENSIONS.height
    );

    this.mainCtx.strokeStyle = "LightGray";
    for (let i = 0; i < 300; i += 25) {
      for (let n = 0; n < 550; n += 25) {
        this.mainCtx.strokeRect(i, n, 25, 25);
      }
    }
    this.extraInfoCtx.strokeStyle = "LightGray";
    for (let i = 0; i < 100; i += 25) {
      for (let n = 0; n < 100; n += 25) {
        this.extraInfoCtx.strokeRect(i, n, 25, 25);
      }
    }

    const messagesDiv = document.getElementById("gameMessages");
    if (messagesDiv) {
      messagesDiv.innerHTML = this.messages?.reduce((acc, message) => {
        return `${acc}${message}<br>`;
      }, `Game speed: ${1}<br>Game messages:<br>`);
    }

    this.currentPiece?.draw(this.mainCtx);
    this.queuedPiece?.draw(this.mainCtx);
    this.forbiddenSquares.forEach((square) => square.draw(this.mainCtx));
  }
}

export { Game };
