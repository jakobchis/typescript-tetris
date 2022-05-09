import { Message } from "./Message";
import { Piece } from "./Piece";
import { PieceSquare } from "./PieceSquare";
import {
  EXTRA_INFO_CANVAS_DIMENSIONS,
  getRandomNewPiece,
  MAIN_CANVAS_DIMENSIONS,
  MESSAGES_CANVAS_DIMENSIONS,
  SQUARE_DIMENSION,
} from "./utils";

class Game {
  currentPiece;
  queuedPiece: Piece | undefined;
  forbiddenSquares: PieceSquare[] = [];
  messages: Message[] = [];
  mainCtx;
  extraInfoCtx;
  messagesCtx;

  constructor(
    initialPiece: Piece,
    mainCtx: CanvasRenderingContext2D,
    extraInfoCtx: CanvasRenderingContext2D,
    messagesCtx: CanvasRenderingContext2D
  ) {
    this.currentPiece = initialPiece;
    this.mainCtx = mainCtx;
    this.extraInfoCtx = extraInfoCtx;
    this.messagesCtx = messagesCtx;
  }

  update(direction: string) {
    this.messages.forEach((message) => (message.age += 1));
    this.messages = this.messages.filter((message) => message.age <= 20);

    // TODO: movement stuff should actually be on Piece class
    // game.handleMovemenet(direction) => currentPiece.move(direction)
    // game.update() should just be for updating game state each tick, doing messages, etc
    if (direction === "up") {
      const nextOrientationIndex = this.currentPiece.getNextOrientationIndex();
      const newSquares = this.currentPiece.orientations[nextOrientationIndex];

      if (this.checkOutOfBounds(newSquares)) {
        return;
      }

      this.currentPiece.orientationIndex = nextOrientationIndex;
      this.currentPiece.squares = newSquares;
    }

    if (direction === "down") {
      const newSquares = this.currentPiece.squares.map((square: any) => ({
        xPos: square.xPos,
        yPos: square.yPos + SQUARE_DIMENSION,
      }));

      if (this.checkOutOfBounds(newSquares)) {
        const squares = this.currentPiece.squares.map((squarePosition) => {
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
      }

      this.currentPiece.orientations.forEach((position: any) => {
        position.forEach(
          (squarePosition: any) => (squarePosition.yPos += SQUARE_DIMENSION)
        );
      });
    }

    if (direction === "left") {
      const newSquares = this.currentPiece.squares.map((square: any) => ({
        ...square,
        xPos: square.xPos - SQUARE_DIMENSION,
      }));

      if (this.checkOutOfBounds(newSquares)) {
        return;
      }

      this.currentPiece.orientations.forEach((position: any) => {
        position.forEach(
          (squarePosition: any) => (squarePosition.xPos -= SQUARE_DIMENSION)
        );
      });
    }

    if (direction === "right") {
      const newSquares = this.currentPiece.squares.map((square: any) => ({
        ...square,
        xPos: square.xPos + SQUARE_DIMENSION,
      }));

      if (this.checkOutOfBounds(newSquares)) {
        return;
      }

      this.currentPiece.orientations.forEach((position: any) => {
        position.forEach(
          (squarePosition: any) => (squarePosition.xPos += SQUARE_DIMENSION)
        );
      });
    }
  }

  queuePiece() {
    if (this.queuedPiece) {
      const newPiece = new Piece(
        this.queuedPiece.type,
        this.queuedPiece.colour,
        false
      );
      this.queuedPiece = new Piece(
        this.currentPiece.type,
        this.currentPiece.colour,
        true
      );
      this.currentPiece = newPiece;
    } else {
      this.queuedPiece = new Piece(
        this.currentPiece.type,
        this.currentPiece.colour,
        true
      );
      this.currentPiece = getRandomNewPiece();
    }
  }

  dropPiece() {
    let dropping = true;

    while (dropping) {
      const newSquares = this.currentPiece.squares.map((square: any) => ({
        ...square,
        yPos: square.yPos + SQUARE_DIMENSION,
      }));

      if (this.checkOutOfBounds(newSquares)) {
        dropping = false;
        return;
      }

      this.currentPiece.orientations.forEach((position: any) => {
        position.forEach(
          (squarePosition: any) => (squarePosition.yPos += SQUARE_DIMENSION)
        );
      });
    }
  }

  checkForLineClear() {
    for (let i = 0; i < MAIN_CANVAS_DIMENSIONS.height; i++) {
      const fullLine = this.forbiddenSquares.filter(
        (square) => square.yPos === i * SQUARE_DIMENSION
      );

      if (fullLine.length === MAIN_CANVAS_DIMENSIONS.width / 25) {
        this.messages.push(new Message("LINE CLEAR!"));

        fullLine.forEach((square) => {
          this.forbiddenSquares.splice(
            this.forbiddenSquares.indexOf(square),
            1
          );
        });
        this.forbiddenSquares.forEach((square) => {
          if (square.yPos < i * SQUARE_DIMENSION) {
            square.yPos += SQUARE_DIMENSION;
          }
        });
      }
    }
  }

  checkGameOver() {
    const gameOver = !!this.currentPiece.squares.find((square) => {
      return this.forbiddenSquares.find((square2) => {
        return square.xPos === square2.xPos && square.yPos === square2.yPos;
      });
    });

    if (gameOver) {
      this.messages.push(new Message("GAME OVER!"));
    }

    return gameOver;
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
    this.messagesCtx.fillStyle = "#2d2d36";
    this.messagesCtx.fillRect(
      0,
      0,
      MESSAGES_CANVAS_DIMENSIONS.width,
      MESSAGES_CANVAS_DIMENSIONS.height
    );

    this.mainCtx.strokeStyle = "LightGray";
    for (let i = 0; i < 300; i += SQUARE_DIMENSION) {
      for (let n = 0; n < 550; n += SQUARE_DIMENSION) {
        this.mainCtx.strokeRect(i, n, SQUARE_DIMENSION, SQUARE_DIMENSION);
      }
    }
    this.extraInfoCtx.strokeStyle = "LightGray";
    for (let i = 0; i < 100; i += SQUARE_DIMENSION) {
      for (let n = 0; n < 100; n += SQUARE_DIMENSION) {
        this.extraInfoCtx.strokeRect(i, n, SQUARE_DIMENSION, SQUARE_DIMENSION);
      }
    }

    this.currentPiece?.draw(this.mainCtx);
    this.queuedPiece?.draw(this.extraInfoCtx);
    this.forbiddenSquares.forEach((square) => square.draw(this.mainCtx));
    this.messages.forEach((message, index) =>
      message.draw(this.messagesCtx, this.messages.length - index)
    );
  }
}

export { Game };
