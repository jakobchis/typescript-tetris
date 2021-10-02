import { Piece, PieceSquare } from "./Piece";
import { dropPiece, movePiece } from "./pieceMovement";
import { LinePiece, LPiece, SquarePiece } from "./PieceTypes";

// Look here for documentation on pieces
// https://tetris.fandom.com/wiki/SRS

const pieces = [LinePiece, LPiece, SquarePiece];
// TODO move these to an exported consts file?
const squareSize = { width: 25, height: 25 };
const gridSize = { height: 22, width: 12 };

let mainCanvas: HTMLCanvasElement;
let extraInfoCanvas: HTMLCanvasElement;
let mainCtx: CanvasRenderingContext2D;
let extraInfoCtx: CanvasRenderingContext2D;
let previousTimestamp: number = 0;
let currentPiece: Piece;
let queuedPiece: Piece;
let forbiddenSquares: PieceSquare[] = [];
let gameOver = false;

const getRandomNewPiece = () => {
  return new pieces[Math.floor(Math.random() * pieces.length)]();
};

const tick = (timestamp: number) => {
  if (previousTimestamp === undefined) {
    previousTimestamp = timestamp;
  }

  let elapsed = timestamp - previousTimestamp;

  if (elapsed > 1000) {
    previousTimestamp = timestamp;
    elapsed = 0;
    console.log("TICK");
    handlePieceMovement("down");
  }

  if (!gameOver) {
    checkForLineClear();
    draw();
    window.requestAnimationFrame(tick);
  } else {
    console.log("GAME OVER");
    document.onkeydown = null;
  }
};

const checkForLineClear = () => {
  for (let i = 0; i < gridSize.height; i++) {
    const fullLine = forbiddenSquares.filter(
      (square) => square.yPos === i * 25
    );

    if (fullLine.length === gridSize.width) {
      console.log("LINE CLEAR");
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

const draw = () => {
  // TODO add game messages text box on the screen
  mainCtx.fillStyle = "LightGray";
  mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

  extraInfoCtx.fillStyle = "white";
  extraInfoCtx.fillRect(0, 0, extraInfoCanvas.width, extraInfoCanvas.height);

  currentPiece.squares.forEach((square) => {
    mainCtx.fillStyle = square.colour;
    mainCtx.fillRect(square.xPos, square.yPos, square.width, square.height);
  });

  forbiddenSquares.forEach((square) => {
    mainCtx.fillStyle = square.colour;
    mainCtx.fillRect(square.xPos, square.yPos, square.width, square.height);
  });

  queuedPiece?.squares.forEach((square) => {
    extraInfoCtx.fillStyle = square.colour;
    extraInfoCtx.fillRect(
      square.xPos,
      square.yPos,
      square.width,
      square.height
    );
  });
};

const handlePieceMovement = (direction: string) => {
  const { newSquares, newCenterPoint } = movePiece(direction, currentPiece);

  const outOfBounds = newSquares.find((square) => {
    return (
      square.yPos >= 550 ||
      square.xPos < 0 ||
      square.xPos < 0 ||
      square.xPos >= 300 ||
      forbiddenSquares.find((forbiddenSquare) => {
        return (
          forbiddenSquare.yPos === square.yPos &&
          forbiddenSquare.xPos === square.xPos
        );
      })
    );
  });

  if (outOfBounds) {
    if (direction === "down") {
      forbiddenSquares.push(...currentPiece.squares);
      currentPiece = getRandomNewPiece();
      gameOver = !!currentPiece.squares.find((square) => {
        return forbiddenSquares.find((square2) => {
          return square.xPos === square2.xPos && square.yPos === square2.yPos;
        });
      });
      return;
    }

    return;
  }

  currentPiece.squares = newSquares;
  currentPiece.centerPoint = newCenterPoint;
};

const handleKeyPress = (e: KeyboardEvent) => {
  console.log("code", e.code);
  // TODO add space bar to drop a piece instantly
  if (e.code === "ArrowDown") {
    handlePieceMovement("down");
  } else if (e.code === "ArrowLeft") {
    handlePieceMovement("left");
  } else if (e.code === "ArrowRight") {
    handlePieceMovement("right");
  } else if (e.code === "ArrowUp") {
    handlePieceMovement("up");
  } else if (e.code === "KeyQ") {
    if (!queuedPiece) {
      queuedPiece = new pieces[
        pieces.indexOf(pieces.find((piece) => piece.name === currentPiece.type))
      ](currentPiece.colour);
      currentPiece = getRandomNewPiece();
    }
  } else if (e.code === "KeyW") {
    currentPiece = queuedPiece;
    queuedPiece = undefined;
  } else if (e.code === "Space") {
    dropPiece();
  }
};

window.addEventListener("load", () => {
  mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
  extraInfoCanvas = document.getElementById(
    "extraInfoCanvas"
  ) as HTMLCanvasElement;
  mainCtx = mainCanvas.getContext("2d");
  extraInfoCtx = extraInfoCanvas.getContext("2d");
  currentPiece = getRandomNewPiece();

  draw();
  document.onkeydown = handleKeyPress;
  window.requestAnimationFrame(tick);
});
