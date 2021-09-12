import { Piece, CenterPoint, PieceSquare } from "./Piece";
import { LinePiece, LPiece, SquarePiece } from "./PieceTypes";

// Look here for documentation on pieces
// https://tetris.fandom.com/wiki/SRS

const pieces = [LinePiece, LPiece, SquarePiece];
// TODO move these to an exported consts file?
const squareSize = { width: 25, height: 25 };
const gridSize = { height: 22, width: 12 };

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let previousTimestamp: number = 0;
let currentPiece: Piece;
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
    movePiece("down");
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
    const fullLine = forbiddenSquares.filter((square) => square.yPos === (i * 25));

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

const rotatePiece = (
  centerXPos: number,
  centerYPos: number,
  xPos: number,
  yPos: number,
  angle: number
) => {
  var radians = (Math.PI / 180) * (angle * -1),
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (xPos - centerXPos) + sin * (yPos - centerYPos) + centerXPos,
    ny = cos * (yPos - centerYPos) - sin * (xPos - centerXPos) + centerYPos;
  return [nx, ny];
};

const movePiece = (direction: string) => {
  let newSquares: PieceSquare[] = [];
  let newCenterPoint: CenterPoint = { ...currentPiece.centerPoint };

  if (direction === "up") {
    newSquares = currentPiece.squares.map((square) => ({
      ...square,
      xPos: rotatePiece(
        currentPiece.centerPoint.xPos,
        currentPiece.centerPoint.yPos,
        square.xPos,
        square.yPos,
        90
      )[0],
      yPos: rotatePiece(
        currentPiece.centerPoint.xPos,
        currentPiece.centerPoint.yPos,
        square.xPos,
        square.yPos,
        90
      )[1],
    }));
  }

  if (direction === "down") {
    newSquares = currentPiece.squares.map((square) => ({
      ...square,
      yPos: square.yPos + 25,
    }));
    newCenterPoint = {
      ...currentPiece.centerPoint,
      yPos: currentPiece.centerPoint.yPos + 25,
    };
  }

  if (direction === "left") {
    newSquares = currentPiece.squares.map((square) => ({
      ...square,
      xPos: square.xPos - 25,
    }));
    newCenterPoint = {
      ...currentPiece.centerPoint,
      xPos: currentPiece.centerPoint.xPos - 25,
    };
  }

  if (direction === "right") {
    newSquares = currentPiece.squares.map((square) => ({
      ...square,
      xPos: square.xPos + 25,
    }));
    newCenterPoint = {
      ...currentPiece.centerPoint,
      xPos: currentPiece.centerPoint.xPos + 25,
    };
  }

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

const draw = () => {
  ctx.fillStyle = "LightGray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  currentPiece.squares.forEach((square) => {
    ctx.fillStyle = square.colour;
    ctx.fillRect(square.xPos, square.yPos, square.width, square.height);
  });

  forbiddenSquares.forEach((square) => {
    ctx.fillStyle = square.colour;
    ctx.fillRect(square.xPos, square.yPos, square.width, square.height);
  });
};

const handleKeyPress = (e: KeyboardEvent) => {
  // TODO add space bar to drop a piece instantly
  // TODO add h to hold a piece and j to use a held piece as the next generated one
  if (e.code === "ArrowDown") {
    movePiece("down");
  } else if (e.code === "ArrowLeft") {
    movePiece("left");
  } else if (e.code === "ArrowRight") {
    movePiece("right");
  } else if (e.code === "ArrowUp") {
    movePiece("up");
  }
};

window.addEventListener("load", () => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d");
  currentPiece = getRandomNewPiece();

  draw();
  document.onkeydown = handleKeyPress;
  window.requestAnimationFrame(tick);
});
