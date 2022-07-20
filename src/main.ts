import { Game } from "./Game";
import { inputHandler } from "./inputHandler";
import { getRandomNewPiece, getScores, SPEED_INCREASE_INTERVAL, TICK_RATE } from "./utils";

// Look here for documentation on tetris pieces
// https://tetris.fandom.com/wiki/SRS

let previousTimestamp = 0;
let tickRate = TICK_RATE.default;
let requestId: number;
let game: Game;
let tickRateInterval: number;

addEventListener("load", async () => {
  const mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
  const extraInfoCanvas = document.getElementById(
    "extraInfoCanvas"
  ) as HTMLCanvasElement;

  const mainCtx = mainCanvas.getContext("2d")!;
  const extraInfoCtx = extraInfoCanvas.getContext("2d")!;

  document.onkeydown = (e) => inputHandler(e, game);

  game = new Game(getRandomNewPiece(), mainCtx, extraInfoCtx, await getScores());

  tickRateInterval = setInterval(() => {
    game.speed = (TICK_RATE.default - tickRate) / 100;
    tickRate = tickRate > TICK_RATE.min ? (tickRate -= 100) : TICK_RATE.min;
  }, SPEED_INCREASE_INTERVAL);

  requestAnimationFrame(tick);
});

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

  game.draw();

  if (gameOver) {
    cancelAnimationFrame(requestId);
    clearInterval(tickRateInterval);
    return;
  }

  requestId = requestAnimationFrame(tick);
};
