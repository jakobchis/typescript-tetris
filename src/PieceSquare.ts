import redSquare from "../assets/square-red.png";
import blueSquare from "../assets/square-blue.png";

const images = { red: redSquare, blue: blueSquare };
class PieceSquare {
  xPos;
  yPos;
  colour;
  image;

  constructor(xPos: number, yPos: number, colour: string) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.colour = colour;
    this.image = new Image();
    this.image.src = images[colour];
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.xPos, this.yPos, 25, 25);
  }
}

export { PieceSquare };
