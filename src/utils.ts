import { Piece } from "./Piece";

const COLOURS = ["red", "blue"] as const;

const getRandomColor = () => {
  return COLOURS[Math.floor(Math.random() * COLOURS.length)];
};

const getRandomNewPiece = () => {
  const randomType = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  return new Piece(randomType, getRandomColor(), false);
};

const MAIN_CANVAS_DIMENSIONS = {
  width: 300,
  height: 550,
};

const EXTRA_INFO_CANVAS_DIMENSIONS = {
  width: 100,
  height: 100,
};

const SQUARE_DIMENSION = 25;

const PIECE_TYPES = [
  "IPiece",
  "JPiece",
  "LPiece",
  "OPiece",
  "SPiece",
  "TPiece",
  "ZPiece",
];

export {
  getRandomColor,
  getRandomNewPiece,
  PIECE_TYPES,
  MAIN_CANVAS_DIMENSIONS,
  EXTRA_INFO_CANVAS_DIMENSIONS,
  SQUARE_DIMENSION
};
