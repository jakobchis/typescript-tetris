import {colours} from './PieceTypes';

type PieceSquare = {
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
};

export class Piece {
  colour: string;
  squares: Array<PieceSquare>;

  updatePosition(direction: string): void {
    if (direction === "up") {
      let willBeOutOfBounds = false;
      this.squares.forEach((square) => {
        if (square.yPosition - 25 <= 0) {
          willBeOutOfBounds = true;
        }
      });
      if (!willBeOutOfBounds) {
        this.squares.forEach((square) => {
          square.yPosition -= 25;
        });
      }
    } else if (direction === "down") {
      let willBeOutOfBounds = false;
      this.squares.forEach((square) => {
        if (square.yPosition + 25 >= 550) {
          willBeOutOfBounds = true;
        }
      });
      if (!willBeOutOfBounds) {
        this.squares.forEach((square) => {
          square.yPosition += 25;
        });
      }
    } else if (direction === "left") {
      let willBeOutOfBounds = false;
      this.squares.forEach((square) => {
        if (square.xPosition - 25 <= 0) {
          willBeOutOfBounds = true;
        }
      });
      if (!willBeOutOfBounds) {
        this.squares.forEach((square) => {
          square.xPosition -= 25;
        });
      }
    } else if (direction === "right") {
      let willBeOutOfBounds = false;
      this.squares.forEach((square) => {
        if (square.xPosition + 25 >= 300) {
          willBeOutOfBounds = true;
        }
      });
      if (!willBeOutOfBounds) {
        this.squares.forEach((square) => {
          square.xPosition += 25;
        });
      }
    }
  }

  checkBounds() {
    
  }
}
