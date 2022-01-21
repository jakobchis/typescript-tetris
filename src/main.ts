import { Piece, PieceSquare, ForbiddenSquare } from "./Piece";
import { getRandomColor, ORIENTATIONS, PIECE_TYPES } from "./utils";

// Look here for documentation on tetris pieces
// https://tetris.fandom.com/wiki/SRS

// TODO move these to an exported consts file?
// const squareSize = { width: 25, height: 25 };
const gridSize = { height: 22, width: 12 };

let mainCanvas: HTMLCanvasElement;
let extraInfoCanvas: HTMLCanvasElement;
let mainCtx: CanvasRenderingContext2D;
let extraInfoCtx: CanvasRenderingContext2D;
let previousTimestamp: number | undefined = 0;
let currentPiece: Piece;
let queuedPiece: Piece;
let forbiddenSquares: ForbiddenSquare[] = [];
let tickRate = 1000;
let gameSpeed = 1;
let gameOver = false;
// TODO add game speed
// let gameSpeedCounter = 1;
let messages: string[] = [];
let requestId: number;

// TODO to be real OOP
// https://www.youtube.com/watch?v=3EMxBkqC4z0

const getCopyOfPiece = (pieceToCopy: Piece) => {
  return new Piece(pieceToCopy.type, pieceToCopy.colour, 0);
};

const getRandomNewPiece = () => {
  const randomType =
    PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  return new Piece(randomType, getRandomColor(), 0);
};

const tick = (timestamp: number) => {
  if (!gameOver) {
    if (previousTimestamp === undefined) {
      previousTimestamp = timestamp;
    }

    let elapsed = timestamp - previousTimestamp;

    if (elapsed > tickRate) {
      handlePieceMovement("down");

      checkForLineClear();
      previousTimestamp = timestamp;
      elapsed = 0;
    }

    requestId = requestAnimationFrame(tick);
  } else {
    messages.push("Game over!");
    cancelAnimationFrame(requestId);
  }

  draw();
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

  const messagesDiv = document.getElementById("gameMessages");
  if (messagesDiv) {
    messagesDiv.innerHTML = messages.reduce((acc, message) => {
      return `${acc}${message}<br>`;
    }, `Game speed: ${gameSpeed}<br>Game messages:<br>`);
  }

  currentPiece.getCurrentOrientation().forEach((square: any) => {
    mainCtx.fillStyle = currentPiece.colour;
    mainCtx.fillRect(square.xPos, square.yPos, 25, 25);
  });

  forbiddenSquares.forEach((square) => {
    mainCtx.fillStyle = square.colour;
    mainCtx.fillRect(square.xPos, square.yPos, 25, 25);
  });

  queuedPiece?.getOrientation(0).forEach((square: any) => {
    extraInfoCtx.fillStyle = queuedPiece.colour;
    extraInfoCtx.fillRect(square.xPos - 100, square.yPos, 25, 25);
  });
};

const isGameOver = (newSquares: PieceSquare[]) => {
  return !!newSquares.find((square) => {
    return forbiddenSquares.find((square2) => {
      return square.xPos === square2.xPos && square.yPos === square2.yPos;
    });
  });
};

const isOutOfBounds = (newSquares: PieceSquare[]) => {
  return newSquares.find((square) => {
    return (
      square.yPos > 525 ||
      square.yPos < 0 ||
      square.xPos < 0 ||
      square.xPos > 275 ||
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
    const newOrientation = currentPiece.getNextOrientationIndex();
    const newSquares = currentPiece
      .getOrientation(newOrientation)
      .map((square: any) => ({
        xPos: square.xPos,
        yPos: square.yPos,
      }));

    if (isOutOfBounds(newSquares)) {
      return;
    }

    currentPiece.setOrientation(newOrientation);
  }

  if (direction === "down") {
    const newSquares = currentPiece
      .getCurrentOrientation()
      .map((square: any) => ({
        xPos: square.xPos,
        yPos: square.yPos + 25,
      }));

    if (isOutOfBounds(newSquares)) {
      const squares = currentPiece
        .getCurrentOrientation()
        .map((squarePosition) => {
          return {
            ...squarePosition,
            colour: currentPiece.colour,
          };
        });
      forbiddenSquares.push(...squares);

      const newPiece = getRandomNewPiece();

      if (isGameOver(newPiece.getCurrentOrientation())) {
        gameOver = true;
      } else {
        currentPiece = newPiece;
      }

      return;
    }

    currentPiece.getOrientations().forEach((position: any) => {
      position.forEach((squarePosition: any) => (squarePosition.yPos += 25));
    });
  }

  if (direction === "left") {
    const newSquares = currentPiece
      .getCurrentOrientation()
      .map((square: any) => ({
        ...square,
        xPos: square.xPos - 25,
      }));

    if (isOutOfBounds(newSquares)) {
      return;
    }

    currentPiece.getOrientations().forEach((position: any) => {
      position.forEach((squarePosition: any) => (squarePosition.xPos -= 25));
    });
  }

  if (direction === "right") {
    const newSquares = currentPiece
      .getCurrentOrientation()
      .map((square: any) => ({
        ...square,
        xPos: square.xPos + 25,
      }));

    if (isOutOfBounds(newSquares)) {
      return;
    }

    currentPiece.getOrientations().forEach((position: any) => {
      position.forEach((squarePosition: any) => (squarePosition.xPos += 25));
    });
  }
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

const handleKeyPress = (e: KeyboardEvent) => {
  if (!requestId) {
    requestId = requestAnimationFrame(tick);
  }

  if (e.code === "ArrowDown") {
    handlePieceMovement("down");
  } else if (e.code === "ArrowLeft") {
    handlePieceMovement("left");
  } else if (e.code === "ArrowRight") {
    handlePieceMovement("right");
  } else if (e.code === "ArrowUp") {
    handlePieceMovement("up");
  } else if (e.code === "KeyQ") {
    if (queuedPiece) {
      const oldCurrentPiece = getCopyOfPiece(currentPiece);
      currentPiece = getCopyOfPiece(queuedPiece);
      queuedPiece = oldCurrentPiece;
    } else {
      queuedPiece = getCopyOfPiece(currentPiece);
      currentPiece = getRandomNewPiece();
    }
  } else if (e.code === "Space") {
    dropPiece();
  }
};

addEventListener("load", () => {
  mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
  extraInfoCanvas = document.getElementById(
    "extraInfoCanvas"
  ) as HTMLCanvasElement;
  mainCtx = mainCanvas.getContext("2d")!;
  extraInfoCtx = extraInfoCanvas.getContext("2d")!;
  currentPiece = getRandomNewPiece();

  document.onkeydown = handleKeyPress;
  draw();
});
