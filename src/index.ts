import { Piece } from "./Piece";
import { LinePiece } from "./PieceTypes";

window.addEventListener("load", () => {
  gameLoop();
});

const gameLoop = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = piece.colour;
    piece.squares.forEach((square) => {
      ctx.fillRect(
        square.xPosition,
        square.yPosition,
        square.width,
        square.height
      );
    });
  };

  // // Tetris grid is: 12x22
  // // Each block needs a concept of an outer/inner square (diy border)
  // let gameGrid = [];
  // for (let i = 0; i < 12; i++) {
  //   const x = 0 + (i * 25);
  //   const y = 0;
  //   gameGrid.push([x, y, 25, 25])
  // }

  // ctx.fillStyle = "green";
  // gameGrid.forEach((square) => ctx.fillRect(square[0], square[1], square[2], square[3]))

  // ctx.fillStyle = 'black'
  // gameGrid.forEach((square) => ctx.fillRect(square[0] + 2, square[1] + 2, square[2] - 5, square[3] - 5))

  const piece = new LinePiece();
  draw();

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code == "ArrowUp") {
      piece.updatePosition("up");
      console.log("up");
    } else if (e.code == "ArrowDown") {
      piece.updatePosition("down");
      console.log("down");
    } else if (e.code == "ArrowLeft") {
      piece.updatePosition("left");
      console.log("left");
    } else if (e.code == "ArrowRight") {
      piece.updatePosition("right");
      console.log("right");
    }

    draw();
  };

  document.onkeydown = handleKeyPress;
};
