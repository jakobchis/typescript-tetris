import { Piece } from "./Piece";

const COLOURS = ["red", "blue", "green", "pink", "purple"] as const;

// TODO: refactor out functions and consts into two files
const getRandomColor = () => {
  return COLOURS[Math.floor(Math.random() * COLOURS.length)];
};

const getRandomNewPiece = () => {
  const randomType =
    PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  return new Piece(randomType, getRandomColor(), false);
};

const getScores = async () => {
  // TODO: implement localstorage score saving
  return [{ date: null, value: null }];
};

const MAIN_CANVAS_DIMENSIONS = {
  width: 300,
  height: 550,
};

const EXTRA_INFO_CANVAS_DIMENSIONS = {
  width: 100,
  height: 100,
};

const TICK_RATE = {
  default: 1000,
  min: 200,
};

const SPEED_INCREASE_INTERVAL = 10000;

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
  getScores,
  PIECE_TYPES,
  MAIN_CANVAS_DIMENSIONS,
  EXTRA_INFO_CANVAS_DIMENSIONS,
  TICK_RATE,
  SQUARE_DIMENSION,
  SPEED_INCREASE_INTERVAL,
};
