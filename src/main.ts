import { Game } from "./Game";
import { inputHandler } from "./inputHandler";
import { getRandomNewPiece, SPEED_INCREASE_INTERVAL, TICK_RATE } from "./utils";

// Look here for documentation on tetris pieces
// https://tetris.fandom.com/wiki/SRS

let previousTimestamp = 0;
let tickRate = TICK_RATE.default;
let requestId: number;
let game: Game;

addEventListener("load", () => {
  const mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
  const extraInfoCanvas = document.getElementById(
    "extraInfoCanvas"
  ) as HTMLCanvasElement;
  const messagesCanvas = document.getElementById(
    "messagesCanvas"
  ) as HTMLCanvasElement;

  const mainCtx = mainCanvas.getContext("2d")!;
  const extraInfoCtx = extraInfoCanvas.getContext("2d")!;
  const messagesCtx = messagesCanvas.getContext("2d")!;

  document.onkeydown = (e) => inputHandler(e, game);

  game = new Game(getRandomNewPiece(), mainCtx, extraInfoCtx, messagesCtx);

  requestAnimationFrame(tick);
});

const tick = (timestamp: number) => {
  if (!previousTimestamp) {
    previousTimestamp = timestamp;
  }

  let elapsed = timestamp - previousTimestamp;
  let gameOver = false;

  if (elapsed > tickRate) {
    console.log("timestamp in seconds", timestamp / 1000);
    console.log("current tickrate " + tickRate);

    const modifier = Math.floor(timestamp / 1000 / SPEED_INCREASE_INTERVAL);
    tickRate = tickRate > TICK_RATE.min ? 1000 - 100 * modifier : 200;

    // TODO: game updating in general shouldn't be tied to an increasing tick rate, should just be the down movement that gets faster
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
