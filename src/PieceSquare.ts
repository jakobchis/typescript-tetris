class PieceSquare {
  xPos;
  yPos;
  colour;

  constructor(xPos: number, yPos: number, colour: string) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.colour = colour;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.colour;
    context.fillRect(this.xPos, this.yPos, 25, 25);
  }
}

export { PieceSquare };
