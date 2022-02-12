import { Game } from "./Game";
import { inputHandler } from "./inputHandler";
import { Piece } from "./Piece";
import { getRandomNewPiece } from "./utils";

// Look here for documentation on tetris pieces
// https://tetris.fandom.com/wiki/SRS

// TODO make a real OOP game
// https://www.youtube.com/watch?v=3EMxBkqC4z0

let previousTimestamp = 0;
let tickRate = 1000;
let requestId: number;
let game: Game;

addEventListener("load", () => {
  const mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
  const extraInfoCanvas = document.getElementById(
    "extraInfoCanvas"
  ) as HTMLCanvasElement;
  const mainCtx = mainCanvas.getContext("2d")!;
  const extraInfoCtx = extraInfoCanvas.getContext("2d")!;

  document.onkeydown = (e) => inputHandler(e, game);

  game = new Game(getRandomNewPiece(), mainCtx, extraInfoCtx);

  requestAnimationFrame(tick);
});

const tick = (timestamp: number) => {
  if (!previousTimestamp) {
    previousTimestamp = timestamp;
  }

  let elapsed = timestamp - previousTimestamp;

  if (elapsed > tickRate) {
    game.update("down");

    previousTimestamp = timestamp;
    elapsed = 0;
  }

  requestId = requestAnimationFrame(tick);
  game.draw();
};

const oldTick = () => {
  // if (!gameOver) {
  //   if (previousTimestamp === undefined) {
  //     previousTimestamp = timestamp;
  //   }
  //   let elapsed = timestamp - previousTimestamp;
  //   if (elapsed > tickRate) {
  //     handlePieceMovement("down");
  //     checkForLineClear();
  //     previousTimestamp = timestamp;
  //     elapsed = 0;
  //   }
  //   requestId = requestAnimationFrame(tick);
  // } else {
  //   messages.push("Game over!");
  //   cancelAnimationFrame(requestId);
  // }
  // draw();
};

const getCopyOfPiece = (pieceToCopy: Piece) => {
  return new Piece(pieceToCopy.type, pieceToCopy.colour, 0);
};

const checkForLineClear = () => {
  for (let i = 0; i < gridSize.height; i++) {
    const fullLine = forbiddenSquares.filter(
      (square) => square.yPos === i * 25
    );

    if (fullLine.length === gridSize.width) {
      messages.push("Line clear!");

      fullLine.forEach((square) => {
        forbiddenSquares.splice(forbiddenSquares.indexOf(square), 1);
      });
      forbiddenSquares.forEach((square) => {
        if (square.yPos < i * 25) {
          square.yPos += 25;
        }
      });
    }
  }
};

const isGameOver = (newSquares: PieceSquare[]) => {
  return !!newSquares.find((square) => {
    return forbiddenSquares.find((square2) => {
      return square.xPos === square2.xPos && square.yPos === square2.yPos;
    });
  });
};

const dropPiece = () => {
  let dropping = true;

  while (dropping) {
    const newSquares = currentPiece
      .getCurrentOrientation()
      .map((square: any) => ({
        xPos: square.xPos,
        yPos: square.yPos + 25,
      }));

    if (isOutOfBounds(newSquares)) {
      dropping = false;
      return;
    }

    currentPiece.getOrientations().forEach((position: any) => {
      position.forEach((squarePosition: any) => (squarePosition.yPos += 25));
    });
  }
};
