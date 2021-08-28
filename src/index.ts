window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  // Tetris grid is: 12x22
  // Each block needs a concept of an outer/inner square (diy border)
  let gameGrid = [];
  for (let i = 0; i < 12; i++) {
    const x = 0 + (i * 25);
    const y = 0;
    gameGrid.push([x, y, 25, 25])
  }

  ctx.fillStyle = "green";
  gameGrid.forEach((square) => ctx.fillRect(...square))

  ctx.fillStyle = 'black'
  gameGrid.forEach((square) => ctx.fillRect(square[0] + 2, square[1] + 2, square[2] - 5, square[3] - 5))

});

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.code == "ArrowUp") {
    console.log("up");
  } else if (e.code == "ArrowDown") {
    console.log("down");
  } else if (e.code == "ArrowLeft") {
    console.log("left");
  } else if (e.code == "ArrowRight") {
    console.log("right");
  }
};

document.onkeydown = handleKeyPress;
