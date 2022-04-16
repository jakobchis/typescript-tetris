import { IMAGES } from "../assets/assets";
import { SQUARE_DIMENSION } from "./utils";
class PieceSquare {
  xPos;
  yPos;
  image;

  constructor(xPos: number, yPos: number, colour: keyof typeof IMAGES) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.image = new Image();
    this.image.src = IMAGES[colour];
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.xPos, this.yPos, SQUARE_DIMENSION, SQUARE_DIMENSION);
  }
}

export { PieceSquare };
