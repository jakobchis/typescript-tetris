import { Piece } from "./Piece";

const colours = ['red', 'blue']

const getRandomColor = () => {
  return colours[Math.floor(Math.random() * colours.length)];
};

const getRandomNewPiece = () => {
  const randomType =
    PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  return new Piece(randomType, getRandomColor(), 0);
};

const MAIN_CANVAS_DIMENSIONS = {
  width: 300,
  height: 550,
};

const EXTRA_INFO_CANVAS_DIMENSIONS = {
  width: 100,
  height: 100,
};

const PIECE_TYPES = [
  "IPiece",
  "JPiece",
  "LPiece",
  "OPiece",
  "SPiece",
  "TPiece",
  "ZPiece",
];

type Orientations = Record<
  typeof PIECE_TYPES[number],
  { xPos: number; yPos: number }[][]
>;

const ORIENTATIONS: Orientations = {
  IPiece: [
    [
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
      { xPos: 175, yPos: 25 },
    ],
    [
      { xPos: 150, yPos: 0 },
      { xPos: 150, yPos: 25 },
      { xPos: 150, yPos: 50 },
      { xPos: 150, yPos: 75 },
    ],
    [
      { xPos: 100, yPos: 50 },
      { xPos: 125, yPos: 50 },
      { xPos: 150, yPos: 50 },
      { xPos: 175, yPos: 50 },
    ],
    [
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
      { xPos: 125, yPos: 75 },
    ],
  ],
  JPiece: [
    [
      { xPos: 100, yPos: 0 },
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
    ],
    [
      { xPos: 125, yPos: 0 },
      { xPos: 150, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
    ],
    [
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
      { xPos: 150, yPos: 50 },
    ],
    [
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
      { xPos: 100, yPos: 50 },
    ],
  ],
  LPiece: [
    [
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
      { xPos: 150, yPos: 0 },
    ],
    [
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
      { xPos: 150, yPos: 50 },
    ],
    [
      { xPos: 100, yPos: 25 },
      { xPos: 100, yPos: 50 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
    ],
    [
      { xPos: 100, yPos: 0 },
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
    ],
  ],
  OPiece: [
    [
      { xPos: 125, yPos: 0 },
      { xPos: 150, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
    ],
  ],
  SPiece: [
    [
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 0 },
      { xPos: 150, yPos: 0 },
    ],
    [
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
      { xPos: 150, yPos: 50 },
    ],
    [
      { xPos: 100, yPos: 50 },
      { xPos: 125, yPos: 50 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
    ],
    [
      { xPos: 100, yPos: 0 },
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
    ],
  ],
  TPiece: [
    [
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
    ],
    [
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
      { xPos: 150, yPos: 25 },
    ],
    [
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
      { xPos: 150, yPos: 25 },
    ],
    [
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
    ],
  ],
  ZPiece: [
    [
      { xPos: 100, yPos: 0 },
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
      { xPos: 150, yPos: 25 },
    ],
    [
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
      { xPos: 150, yPos: 0 },
      { xPos: 150, yPos: 25 },
    ],
    [
      { xPos: 100, yPos: 25 },
      { xPos: 125, yPos: 25 },
      { xPos: 125, yPos: 50 },
      { xPos: 150, yPos: 50 },
    ],
    [
      { xPos: 100, yPos: 25 },
      { xPos: 100, yPos: 50 },
      { xPos: 125, yPos: 0 },
      { xPos: 125, yPos: 25 },
    ],
  ],
};

export {
  getRandomColor,
  getRandomNewPiece,
  ORIENTATIONS,
  PIECE_TYPES,
  MAIN_CANVAS_DIMENSIONS,
  EXTRA_INFO_CANVAS_DIMENSIONS,
};
