import { CenterPoint, Piece, PieceSquare } from "./Piece";

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
    newX = cos * (xPos - centerXPos) + sin * (yPos - centerYPos) + centerXPos,
    newY = cos * (yPos - centerYPos) - sin * (xPos - centerXPos) + centerYPos;
  return [newX, newY];
};

const movePiece = (direction: string, currentPiece: Piece) => {
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

  return { newSquares, newCenterPoint };
};

const dropPiece = () => {
  return;
};

export { movePiece, dropPiece };
