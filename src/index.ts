import { LinePiece, SquarePiece } from "./PieceTypes";

const game = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  let previousTimestamp = 0;
  let piece = new LinePiece();
  let forbiddenSquares = [];
  let gameOver = false;

  const tick = (timestamp) => {
    if (previousTimestamp === undefined) previousTimestamp = timestamp;
    let elapsed = timestamp - previousTimestamp;

    if (elapsed > 1000) {
      previousTimestamp = timestamp;
      elapsed = 0;
      console.log("tick");
      movePiece("down");
      draw();
    }

    if (!gameOver) {
      window.requestAnimationFrame(tick);
    } else {
      console.log("GAME OVER");
      document.onkeydown = null;
    }
  };

  const movePiece = (direction) => {
    let newSquares = [];
    if (direction === "down") {
      newSquares = piece.squares.map((square) => ({
        ...square,
        yPosition: square.yPosition + 25,
      }));

      const outOfBounds = newSquares.find((square) => {
        return (
          square.yPosition >= 550 ||
          forbiddenSquares.find((forbiddenSquare) => {
            return (
              forbiddenSquare.yPosition === square.yPosition &&
              forbiddenSquare.xPosition === square.xPosition
            );
          })
        );
      });

      if (outOfBounds) {
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

      piece.squares = newSquares;
    }

    if (direction === "left") {
      newSquares = piece.squares.map((square) => ({
        ...square,
        xPosition: square.xPosition - 25,
      }));

      const outOfBounds = newSquares.find((square) => {
        return (
          square.xPosition < 0 ||
          forbiddenSquares.find((forbiddenSquare) => {
            return (
              forbiddenSquare.yPosition === square.yPosition &&
              forbiddenSquare.xPosition === square.xPosition
            );
          })
        );
      });

      if (outOfBounds) {
        return;
      }

      piece.squares = newSquares;
    }

    if (direction === "right") {
      newSquares = piece.squares.map((square) => ({
        ...square,
        xPosition: square.xPosition + 25,
      }));

      const outOfBounds = newSquares.find((square) => {
        return (
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
        return;
      }

      piece.squares = newSquares;
    }
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
    if (e.code == "ArrowDown") {
      movePiece("down");
    } else if (e.code == "ArrowLeft") {
      movePiece("left");
    } else if (e.code == "ArrowRight") {
      movePiece("right");
    }

    draw();
  };

  draw();
  document.onkeydown = handleKeyPress;
  window.requestAnimationFrame(tick);
};

window.addEventListener("load", () => {
  game();
});
