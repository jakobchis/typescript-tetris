import { Game } from "./Game";

const inputHandler = (e: KeyboardEvent, game: Game) => {
  if (e.code === "ArrowDown" || e.code === "KeyS") {
    game.update("down");
  } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
    game.update("left");
  } else if (e.code === "ArrowRight" || e.code === "KeyD") {
    game.update("right");
  } else if (e.code === "ArrowUp" || e.code === "KeyW") {
    game.update("up");
  } else if (e.code === "KeyQ") {
    game.queuePiece();
  } else if (e.code === "Space") {
    game.dropPiece();
  }
};

export { inputHandler };
