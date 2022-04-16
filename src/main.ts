import { Game } from "./Game";
import { inputHandler } from "./inputHandler";
import { getRandomNewPiece } from "./utils";

// Look here for documentation on tetris pieces
// https://tetris.fandom.com/wiki/SRS

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

// TODO: add speed modifier variable
const tick = (timestamp: number) => {
  if (!previousTimestamp) {
    previousTimestamp = timestamp;
  }

  let elapsed = timestamp - previousTimestamp;
  let gameOver = false;

  if (elapsed > tickRate) {
    game.update("down");
    game.checkForLineClear();
    gameOver = game.checkGameOver();

    previousTimestamp = timestamp;
    elapsed = 0;
  }

  if (!gameOver) {
    requestId = requestAnimationFrame(tick);
  }

  game.draw();
};

