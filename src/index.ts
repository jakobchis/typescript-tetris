import { CenterPoint } from "./Piece";
import { LinePiece, LPiece, SquarePiece } from "./PieceTypes";

let canvas, ctx;
let previousTimestamp = 0;
let piece = new LPiece();
let forbiddenSquares = [];
let gameOver = false;
const gridSize = { height: 22, width: 12 };

const tick = (timestamp) => {
  if (previousTimestamp === undefined) previousTimestamp = timestamp;
  let elapsed = timestamp - previousTimestamp;

  if (elapsed > 1000) {
    previousTimestamp = timestamp;
    elapsed = 0;
    console.log("tick");
    movePiece("down");
    draw();
    checkTetris();
  }

  if (!gameOver) {
    window.requestAnimationFrame(tick);
  } else {
    console.log("GAME OVER");
    document.onkeydown = null;
  }
};

// TODO: fix logic here and remove rows when a tetris happens (and shift everything down)
const checkTetris = () => {
  let newForbiddenSquares = [];
  for (let i = 0; i < gridSize.height; i ++) {
    const taco = forbiddenSquares.filter((square) => square.yPosition === (i * 25))
    if (taco.length === gridSize.width) {
      console.log("tetris found!")
    } else {
      newForbiddenSquares.push(taco)
    }

  }

  forbiddenSquares = newForbiddenSquares;
};

const rotate = (cx, cy, x, y, angle) => {
  var radians = (Math.PI / 180) * (angle * -1),
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
};

const movePiece = (direction) => {
  let newSquares = [];
  let newCenterPoint: CenterPoint = { ...piece.centerPoint };

  if (direction === "up") {
    newSquares = piece.squares.map((square) => ({
      ...square,
      xPosition: rotate(
        piece.centerPoint.xPosition,
        piece.centerPoint.yPosition,
        square.xPosition,
        square.yPosition,
        90
      )[0],
      yPosition: rotate(
        piece.centerPoint.xPosition,
        piece.centerPoint.yPosition,
        square.xPosition,
        square.yPosition,
        90
      )[1],
    }));
  }

  if (direction === "down") {
    newSquares = piece.squares.map((square) => ({
      ...square,
      yPosition: square.yPosition + 25,
    }));
    newCenterPoint = {
      ...piece.centerPoint,
      yPosition: piece.centerPoint.yPosition + 25,
    };
  }

  if (direction === "left") {
    newSquares = piece.squares.map((square) => ({
      ...square,
      xPosition: square.xPosition - 25,
    }));
    newCenterPoint = {
      ...piece.centerPoint,
      xPosition: piece.centerPoint.xPosition - 25,
    };
  }

  if (direction === "right") {
    newSquares = piece.squares.map((square) => ({
      ...square,
      xPosition: square.xPosition + 25,
    }));
    newCenterPoint = {
      ...piece.centerPoint,
      xPosition: piece.centerPoint.xPosition + 25,
    };
  }

  const outOfBounds = newSquares.find((square) => {
    return (
      square.yPosition >= 550 ||
      square.xPosition < 0 ||
      square.xPosition < 0 ||
      square.xPosition >= 300 ||
      forbiddenSquares.find((forbiddenSquare) => {
        return (
          forbiddenSquare.yPosition === square.yPosition &&
          forbiddenSquare.xPosition === square.xPosition
        );
      })
    );
  });

  if (outOfBounds) {
    if (direction === "down") {
      forbiddenSquares.push(...piece.squares);
      piece = new LinePiece();
      gameOver = !!piece.squares.find((square) => {
        return forbiddenSquares.find((square2) => {
          return (
            square.xPosition === square2.xPosition &&
            square.yPosition === square2.yPosition
          );
        });
      });
      return;
    }

    return;
  }

  piece.squares = newSquares;
  piece.centerPoint = newCenterPoint;
};

const draw = () => {
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  piece.squares.forEach((square) => {
    ctx.fillStyle = square.colour;
    ctx.fillRect(
      square.xPosition,
      square.yPosition,
      square.width,
      square.height
    );
  });

  forbiddenSquares.forEach((square) => {
    ctx.fillStyle = square.colour;
    ctx.fillRect(
      square.xPosition,
      square.yPosition,
      square.width,
      square.height
    );
  });
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.code === "ArrowDown") {
    movePiece("down");
  } else if (e.code === "ArrowLeft") {
    movePiece("left");
  } else if (e.code === "ArrowRight") {
    movePiece("right");
  } else if (e.code === "ArrowUp") {
    movePiece("up");
  }

  draw();
};

window.addEventListener("load", () => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d");

  draw();
  document.onkeydown = handleKeyPress;
  window.requestAnimationFrame(tick);
});
