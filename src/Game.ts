import { Message } from "./Message";
import { PieceSquare } from "./PieceSquare";
import { Score } from "./Score";
import {
  EXTRA_INFO_CANVAS_DIMENSIONS,
  getRandomColor,
  getRandomType,
  getScores,
  MAIN_CANVAS_DIMENSIONS,
  publishScore,
  SQUARE_DIMENSION,
} from "./utils";
import { QueuedPiece } from "./QueuedPiece";
import { GamePiece } from "./GamePiece";

class Game {
  currentPiece: GamePiece;
  queuedPiece: QueuedPiece | undefined;
  forbiddenSquares: PieceSquare[] = [];
  messages: Message[] = [];
  mainCtx;
  extraInfoCtx;
  speed = 0;
  score = new Score();

  constructor(
    initialPiece: GamePiece,
    mainCtx: CanvasRenderingContext2D,
    extraInfoCtx: CanvasRenderingContext2D
  ) {
    this.currentPiece = initialPiece;
    this.mainCtx = mainCtx;
    this.extraInfoCtx = extraInfoCtx;
  }

  handleNewPiece(squares: PieceSquare[]) {
    this.forbiddenSquares.push(...squares);
    this.currentPiece = new GamePiece(getRandomType(), getRandomColor());
  }

  update(direction: "up" | "down" | "left" | "right") {
    this.messages.forEach((message) => (message.age += 1));
    this.messages = this.messages.filter((message) => message.age <= 20);
    this.currentPiece.update(
      direction,
      this.forbiddenSquares,
      this.handleNewPiece.bind(this)
    );
  }

  queuePiece() {
    if (this.queuedPiece) {
      const newPiece = new GamePiece(
        this.queuedPiece.type,
        this.queuedPiece.colour
      );
      this.queuedPiece = new QueuedPiece(
        this.currentPiece.type,
        this.currentPiece.colour
      );
      this.currentPiece = newPiece;
    } else {
      this.queuedPiece = new QueuedPiece(
        this.currentPiece.type,
        this.currentPiece.colour
      );
      this.currentPiece = new GamePiece(getRandomType(), getRandomColor());
    }
  }

  checkForLineClear() {
    for (let i = 0; i < MAIN_CANVAS_DIMENSIONS.height; i++) {
      const fullLine = this.forbiddenSquares.filter(
        (square) => square.yPos === i * SQUARE_DIMENSION
      );

      if (fullLine.length === MAIN_CANVAS_DIMENSIONS.width / 25) {
        this.messages.push(new Message("LINE CLEAR!"));
        this.score.increment();

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
      publishScore(this.score);
    }

    return gameOver;
  }

  dropPiece() {
    this.currentPiece.dropPiece(this.forbiddenSquares);
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

  drawText(span: HTMLElement, text: string[]) {
    const textWithBreaks = text.join("<br>");

    if (span.innerHTML.includes(textWithBreaks)) return;

    span.innerHTML = textWithBreaks;
  }

  drawTable(table: HTMLElement, scores: Score[]) {
    if (!scores) return;

    const text = `
      <tbody>
        <tr>
          <th>date</th>
          <th>score</th>
        </tr>
        ${scores
          .map((score: any) => {
            return `<tr><td>${score.date}</td><td>${score.value}</td></tr>`;
          })
          .join("")}
      </tbody>
    `;

    if (table.innerHTML.includes(text)) return;

    table.innerHTML = text;
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

    this.currentPiece.draw(this.mainCtx);
    this.queuedPiece?.draw(this.extraInfoCtx);
    this.forbiddenSquares.forEach((square) => square.draw(this.mainCtx));

    const messagesSpan = document.getElementById("messagesSpan") as HTMLElement;
    const messagesString = this.messages
      .map((message) => message.text)
      .join("<br>");
    this.drawText(messagesSpan, [messagesString]);

    const gameInfoSpan = document.getElementById("gameInfoSpan") as HTMLElement;
    const gameSpeedString = `game speed: ${this.speed.toString()}`;
    const gameScoreString = `game score: ${this.score.value.toString()}`;
    this.drawText(gameInfoSpan, [gameSpeedString, gameScoreString]);

    const scoresTable = document.getElementById("scoresTable") as HTMLElement;
    this.drawTable(scoresTable, getScores());
  }
}

export { Game };
