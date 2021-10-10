import { Piece, PieceSquare, ForbiddenSquare } from "./Piece";
import {
  IPiece,
  JPiece,
  LPiece,
  OPiece,
  SPiece,
  TPiece,
  ZPiece,
} from "./PieceTypes";

// Look here for documentation on pieces
// https://tetris.fandom.com/wiki/SRS

const pieces = [IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece];

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
let forbiddenSquares: ForbiddenSquare[] = [];
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

// TODO add game messages text box on the screen
const draw = () => {
  mainCtx.fillStyle = "White";
  mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
  mainCtx.strokeStyle = "LightGray";
  for (let i = 0; i < 300; i += 25) {
    for (let n = 0; n < 550; n += 25) {
      mainCtx.strokeRect(i, n, 25, 25);
    }
  }

  extraInfoCtx.fillStyle = "White";
  extraInfoCtx.fillRect(0, 0, extraInfoCanvas.width, extraInfoCanvas.height);
  extraInfoCtx.strokeStyle = "LightGray";
  for (let i = 0; i < 100; i += 25) {
    for (let n = 0; n < 100; n += 25) {
      extraInfoCtx.strokeRect(i, n, 25, 25);
    }
  }

  currentPiece.positions[currentPiece.position].forEach((square: any) => {
    mainCtx.fillStyle = currentPiece.colour;
    mainCtx.fillRect(square.xPos, square.yPos, 25, 25);
  });

  forbiddenSquares.forEach((square) => {
    mainCtx.fillStyle = square.colour;
    mainCtx.fillRect(square.xPos, square.yPos, 25, 25);
  });

  queuedPiece?.positions[0].forEach((square: any) => {
    extraInfoCtx.fillStyle = queuedPiece.colour;
    extraInfoCtx.fillRect(square.xPos - 100, square.yPos, 25, 25);
  });
};

const isOutOfBounds = (newSquares: PieceSquare[]) => {
  return newSquares.find((square) => {
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
};

const handlePieceMovement = (direction: string) => {
  if (direction === "up") {
    const newPosition =
      currentPiece.position + 1 < currentPiece.positions.length
        ? currentPiece.position + 1
        : 0;
    const newSquares = currentPiece.positions[newPosition].map(
      (square: any) => ({
        xPos: square.xPos,
        yPos: square.yPos,
      })
    );

    if (isOutOfBounds(newSquares)) {
      return;
    }

    currentPiece.position = newPosition;
  }

  if (direction === "down") {
    const newSquares = currentPiece.positions[currentPiece.position].map(
      (square: any) => ({
        xPos: square.xPos,
        yPos: square.yPos + 25,
      })
    );

    if (isOutOfBounds(newSquares)) {
      const squares = currentPiece.positions[currentPiece.position].map(
        (squarePosition) => {
          return {
            ...squarePosition,
            colour: currentPiece.colour,
          };
        }
      );
      forbiddenSquares.push(...squares);

      currentPiece = getRandomNewPiece();
      gameOver = !!currentPiece.positions[currentPiece.position].find(
        (square) => {
          return forbiddenSquares.find((square2) => {
            return square.xPos === square2.xPos && square.yPos === square2.yPos;
          });
        }
      );

      return;
    }

    currentPiece.positions.forEach((position: any) => {
      position.forEach((squarePosition: any) => (squarePosition.yPos += 25));
    });
  }

  if (direction === "left") {
    const newSquares = currentPiece.positions[currentPiece.position].map(
      (square: any) => ({
        ...square,
        xPos: square.xPos - 25,
      })
    );

    if (isOutOfBounds(newSquares)) {
      return;
    }

    currentPiece.positions.forEach((position: any) => {
      position.forEach((squarePosition: any) => (squarePosition.xPos -= 25));
    });
  }

  if (direction === "right") {
    const newSquares = currentPiece.positions[currentPiece.position].map(
      (square: any) => ({
        ...square,
        xPos: square.xPos + 25,
      })
    );

    if (isOutOfBounds(newSquares)) {
      return;
    }

    currentPiece.positions.forEach((position: any) => {
      position.forEach((squarePosition: any) => (squarePosition.xPos += 25));
    });
  }
};

const handleKeyPress = (e: KeyboardEvent) => {
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

      console.log(["queuedPiece", queuedPiece]);
    }
  } else if (e.code === "KeyW") {
    currentPiece = queuedPiece;
    queuedPiece = undefined;
  } else if (e.code === "Space") {
    // TODO implement dropPiece()
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
