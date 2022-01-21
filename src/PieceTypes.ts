// import { Piece } from "./Piece";
// import { getRandomColor } from "./utils";

// class IPiece extends Piece {
//   constructor(initialColour?: string) {
//     const type = "IPiece";
//     const colour = initialColour ?? getRandomColor();
//     const orientationIndex = 0;
//     const orientations = [
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//         { xPos: 175, yPos: 25 },
//       ],
//       [
//         { xPos: 150, yPos: 0 },
//         { xPos: 150, yPos: 25 },
//         { xPos: 150, yPos: 50 },
//         { xPos: 150, yPos: 75 },
//       ],
//       [
//         { xPos: 100, yPos: 50 },
//         { xPos: 125, yPos: 50 },
//         { xPos: 150, yPos: 50 },
//         { xPos: 175, yPos: 50 },
//       ],
//       [
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//         { xPos: 125, yPos: 75 },
//       ],
//     ];

//     super(type, colour, orientationIndex, orientations);
//   }
// }

// class JPiece extends Piece {
//   constructor(initialColour?: string) {
//     const type = "JPiece";
//     const colour = initialColour ?? getRandomColor();
//     const orientationIndex = 0;
//     const orientations = [
//       [
//         { xPos: 100, yPos: 0 },
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//       ],
//       [
//         { xPos: 125, yPos: 0 },
//         { xPos: 150, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//       ],
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//         { xPos: 150, yPos: 50 },
//       ],
//       [
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//         { xPos: 100, yPos: 50 },
//       ],
//     ];

//     super(type, colour, orientationIndex, orientations);
//   }
// }

// class LPiece extends Piece {
//   constructor(initialColour?: string) {
//     const type = "LPiece";
//     const colour = initialColour ?? getRandomColor();
//     const orientationIndex = 0;
//     const orientations = [
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//         { xPos: 150, yPos: 0 },
//       ],
//       [
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//         { xPos: 150, yPos: 50 },
//       ],
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 100, yPos: 50 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//       ],
//       [
//         { xPos: 100, yPos: 0 },
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//       ],
//     ];

//     super(type, colour, orientationIndex, orientations);
//   }
// }

// class OPiece extends Piece {
//   constructor(initialColour?: string) {
//     const type = "OPiece";
//     const colour = initialColour ?? getRandomColor();
//     const orientationIndex = 0;
//     const orientations = [
//       [
//         { xPos: 125, yPos: 0 },
//         { xPos: 150, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//       ],
//     ];

//     super(type, colour, orientationIndex, orientations);
//   }
// }

// class SPiece extends Piece {
//   constructor(initialColour?: string) {
//     const type = "SPiece";
//     const colour = initialColour ?? getRandomColor();
//     const orientationIndex = 0;
//     const orientations = [
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 0 },
//         { xPos: 150, yPos: 0 },
//       ],
//       [
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//         { xPos: 150, yPos: 50 },
//       ],
//       [
//         { xPos: 100, yPos: 50 },
//         { xPos: 125, yPos: 50 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//       ],
//       [
//         { xPos: 100, yPos: 0 },
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//       ],
//     ];

//     super(type, colour, orientationIndex, orientations);
//   }
// }

// class TPiece extends Piece {
//   constructor(initialColour?: string) {
//     const type = "TPiece";
//     const colour = initialColour ?? getRandomColor();
//     const orientationIndex = 0;
//     const orientations = [
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//       ],
//       [
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//         { xPos: 150, yPos: 25 },
//       ],
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//         { xPos: 150, yPos: 25 },
//       ],
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//       ],
//     ];

//     super(type, colour, orientationIndex, orientations);
//   }
// }

// class ZPiece extends Piece {
//   constructor(initialColour?: string) {
//     const type = "ZPiece";
//     const colour = initialColour ?? getRandomColor();
//     const orientationIndex = 0;
//     const orientations = [
//       [
//         { xPos: 100, yPos: 0 },
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 150, yPos: 25 },
//       ],
//       [
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//         { xPos: 150, yPos: 0 },
//         { xPos: 150, yPos: 25 },
//       ],
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 125, yPos: 25 },
//         { xPos: 125, yPos: 50 },
//         { xPos: 150, yPos: 50 },
//       ],
//       [
//         { xPos: 100, yPos: 25 },
//         { xPos: 100, yPos: 50 },
//         { xPos: 125, yPos: 0 },
//         { xPos: 125, yPos: 25 },
//       ],
//     ];

//     super(type, colour, orientationIndex, orientations);
//   }
// }

// export { IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece };
