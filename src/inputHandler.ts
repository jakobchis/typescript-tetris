import { Game } from "./Game";

const inputHandler = (e: KeyboardEvent, game: Game) => {
  if (e.code === "ArrowDown") {
    game.update("down");
  } else if (e.code === "ArrowLeft") {
    game.update("left");
  } else if (e.code === "ArrowRight") {
    game.update("right");
  } else if (e.code === "ArrowUp") {
    game.update("up");
  } else if (e.code === "KeyQ") {
    // if (queuedPiece) {
    //   const oldCurrentPiece = getCopyOfPiece(currentPiece);
    //   currentPiece = getCopyOfPiece(queuedPiece);
    //   queuedPiece = oldCurrentPiece;
    // } else {
    //   queuedPiece = getCopyOfPiece(currentPiece);
    //   currentPiece = getRandomNewPiece();
    // }
  } else if (e.code === "Space") {
    // dropPiece();
  }
};

export { inputHandler };
