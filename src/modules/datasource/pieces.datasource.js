import { ReplaySubject } from 'rxjs';

export const PiecesDataSource = (() => {
  let pieceRemoved = new ReplaySubject();

  const darkPiecesLocation = {
    0: 'A1',
    1: 'C1',
    2: 'E1',
    3: 'G1',
    4: 'B2',
    5: 'D2',
    6: 'F2',
    7: 'H2',
    8: 'A3',
    9: 'C3',
    10: 'E3',
    11: 'G3',
  }

  const lightPiecesLocation = {
    0: 'A8',
    1: 'C8',
    2: 'E8',
    3: 'G8',
    4: 'B7',
    5: 'D7',
    6: 'F7',
    7: 'H7',
    8: 'A6',
    9: 'C6',
    10: 'E6',
    11: 'G6',
  }

  const getDarkPiecesLocation = () => {
    return darkPiecesLocation;
  }

  const setDarkPieceLocation = (piece, location) => {
    if (!location) {
      pieceRemoved.next(darkPiecesLocation[piece]);
    }
    darkPiecesLocation[piece] = location;
  }

  const getLightPiecesLocation = () => {
    return lightPiecesLocation;
  }

  const setLightPieceLocation = (piece, location) => {
    if (!location) {
      pieceRemoved.next(lightPiecesLocation[piece]);
    }
    lightPiecesLocation[piece] = location;
  }

  const getDarkPiecesPossibleLocation = () => {
    return [
      'A1', 'C1', 'E1', 'G1', 'B2', 'D2', 'F2', 'H2', 'A3', 'C3', 'E3', 'G3',
      'B4', 'D4', 'F4', 'H4', 'A5', 'C5', 'E5', 'G5', 'B6', 'D6', 'F6', 'H6',
      'A7', 'C7', 'E7', 'G7', 'B8', 'D8', 'F8', 'H8'
    ];
  }

  const getLightPiecesPossibleLocation = () => {
    return [
      'A8', 'C8', 'E8', 'G8', 'B7', 'D7', 'F7', 'H7', 'A6', 'C6', 'E6', 'G6',
      'B5', 'D5', 'F5', 'H5', 'A4', 'C4', 'E4', 'G4', 'B3', 'D3', 'F3', 'H4',
      'A2', 'C2', 'E2', 'G2', 'B1', 'D1', 'F1', 'H1'
    ];
  }

  const getPieceRemoved = () => {
    return pieceRemoved;
  }

  return {
    getDarkPiecesLocation,
    setDarkPieceLocation,
    getLightPiecesLocation,
    setLightPieceLocation,
    getDarkPiecesPossibleLocation,
    getLightPiecesPossibleLocation,
    getPieceRemoved
  };
})()