import { Piece } from "./Piece";
import { getRandomColor } from "./utils";

class IPiece extends Piece {
  constructor(colour?: string) {
    super();
    this.type = "IPiece";
    this.colour = colour ?? getRandomColor();
    this.orientationIndex = 0;
    this.orientations = [
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
    ];
  }
}

class JPiece extends Piece {
  constructor(colour?: string) {
    super();
    this.type = "JPiece";
    this.colour = colour ?? getRandomColor();
    this.orientationIndex = 0;
    this.orientations = [
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
    ];
  }
}

class LPiece extends Piece {
  constructor(colour?: string) {
    super();
    this.type = "LPiece";
    this.colour = colour ?? getRandomColor();
    this.orientationIndex = 0;
    this.orientations = [
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
    ];
  }
}

class OPiece extends Piece {
  constructor(colour?: string) {
    super();
    this.type = "OPiece";
    this.colour = colour ?? getRandomColor();
    this.orientationIndex = 0;
    this.orientations = [
      [
        { xPos: 125, yPos: 0 },
        { xPos: 150, yPos: 0 },
        { xPos: 125, yPos: 25 },
        { xPos: 150, yPos: 25 },
      ],
    ];
  }
}

class SPiece extends Piece {
  constructor(colour?: string) {
    super();
    this.type = "SPiece";
    this.colour = colour ?? getRandomColor();
    this.orientationIndex = 0;
    this.orientations = [
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
    ];
  }
}

class TPiece extends Piece {
  constructor(colour?: string) {
    super();
    this.type = "TPiece";
    this.colour = colour ?? getRandomColor();
    this.orientationIndex = 0;
    this.orientations = [
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
    ];
  }
}

class ZPiece extends Piece {
  constructor(colour?: string) {
    super();
    this.type = "ZPiece";
    this.colour = colour ?? getRandomColor();
    this.orientationIndex = 0;
    this.orientations = [
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
    ];
  }
}

export { IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece };
