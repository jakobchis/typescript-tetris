import { Score } from "./Score";

const COLOURS = ["red", "blue", "green", "pink", "purple"] as const;

const getRandomColor = () => {
  return COLOURS[Math.floor(Math.random() * COLOURS.length)];
};

const getRandomType = () => {
  const randomType =
    PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  return randomType;
};

const isScores = (scores: any): scores is Score[] => {
  return scores.map((score: any) => {
    return score.date && score.value;
  });
};

const getScores = () => {
  const rawScores = localStorage.getItem("scores");
  if (!rawScores) return [];

  const scores = JSON.parse(rawScores);
  if (!isScores(scores)) return [];

  return scores;
};

const publishScore = (newScore: Score) => {
  const newScores = JSON.stringify([...getScores(), newScore]);
  localStorage.setItem("scores", newScores);
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
  getRandomType,
  publishScore,
  getScores,
  PIECE_TYPES,
  MAIN_CANVAS_DIMENSIONS,
  EXTRA_INFO_CANVAS_DIMENSIONS,
  TICK_RATE,
  SQUARE_DIMENSION,
  SPEED_INCREASE_INTERVAL,
};
