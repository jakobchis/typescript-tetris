import { Orientation } from "./Piece";

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

const ORIENTATIONS: Record<typeof PIECE_TYPES[number], Orientation[]> = {
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

export { getRandomColor, ORIENTATIONS, PIECE_TYPES };
