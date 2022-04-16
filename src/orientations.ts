import { PIECE_TYPES, SQUARE_DIMENSION } from "./utils";

type Orientations = Record<
  typeof PIECE_TYPES[number],
  { xPos: number; yPos: number }[][]
>;

const ORIENTATIONS: Orientations = {
  IPiece: [
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 3, yPos: SQUARE_DIMENSION },
    ],
    [
      { xPos: SQUARE_DIMENSION * 2, yPos: 0 },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION * 3 },
    ],
    [
      { xPos: 0, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION * 3, yPos: SQUARE_DIMENSION * 2 },
    ],
    [
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 3 },
    ],
  ],
  JPiece: [
    [
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
    ],
    [
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION * 2, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
    ],
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION * 2 },
    ],
    [
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
      { xPos: 0, yPos: SQUARE_DIMENSION * 2 },
    ],
  ],
  LPiece: [
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: 0 },
    ],
    [
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION * 2 },
    ],
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: 0, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
    ],
    [
      { xPos: 0, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
    ],
  ],
  OPiece: [
    [
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION * 2, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
    ],
  ],
  SPiece: [
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION * 2, yPos: 0 },
    ],
    [
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION * 2 },
    ],
    [
      { xPos: 0, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
    ],
    [
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
    ],
  ],
  TPiece: [
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
    ],
    [
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
    ],
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
    ],
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
    ],
  ],
  ZPiece: [
    [
      { xPos: 0, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
    ],
    [
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION * 2, yPos: 0 },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION },
    ],
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION * 2, yPos: SQUARE_DIMENSION * 2 },
    ],
    [
      { xPos: 0, yPos: SQUARE_DIMENSION },
      { xPos: 0, yPos: SQUARE_DIMENSION * 2 },
      { xPos: SQUARE_DIMENSION, yPos: 0 },
      { xPos: SQUARE_DIMENSION, yPos: SQUARE_DIMENSION },
    ],
  ],
};

export { Orientations, ORIENTATIONS };
