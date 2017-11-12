import { ReplaySubject } from 'rxjs';
import { BoardLimits } from '../shared/constants';

export const PiecesDataSource = (() => {
  let pieceRemoved = new ReplaySubject();
  let darkKings = [];
  let lightKings = [];

  // const darkPiecesLocation = {
  //   0: 'A1',
  //   1: 'C1',
  //   2: 'E1',
  //   3: 'G1',
  //   4: 'B2',
  //   5: 'D2',
  //   6: 'F2',
  //   7: 'H2',
  //   8: 'A3',
  //   9: 'C3',
  //   10: 'E3',
  //   11: 'G3',
  // }

  // const lightPiecesLocation = {
  //   0: 'A8',
  //   1: 'C8',
  //   2: 'E8',
  //   3: 'G8',
  //   4: 'B7',
  //   5: 'D7',
  //   6: 'F7',
  //   7: 'H7',
  //   8: 'A6',
  //   9: 'C6',
  //   10: 'E6',
  //   11: 'G6',
  // }

  const darkPiecesLocation = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: 'A7',
  }

  const lightPiecesLocation = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: 'A2',
  }

  const getDarkPiecesLocation = () => {
    return darkPiecesLocation;
  }

  const setDarkPieceLocation = (piece, location) => {
    if (!location) {
      pieceRemoved.next(darkPiecesLocation[piece]);
    }
    darkPiecesLocation[piece] = location;
    updateDarkKings(piece, location);
  }

  const updateDarkKings = (piece, location) => {
    if (!location) {
      const index = darkKings.indexOf(piece);
      if (index !== -1) {
        darkKings.splice(index, 1);
      }
    } else if (+location[1] === BoardLimits.top && darkKings.indexOf(piece) === -1) {
      darkKings.push(piece);
    }
  }

  const getDarkkings = () => {
    return darkKings;
  }

  const getLightPiecesLocation = () => {
    return lightPiecesLocation;
  }

  const setLightPieceLocation = (piece, location) => {
    if (!location) {
      pieceRemoved.next(lightPiecesLocation[piece]);
    }
    lightPiecesLocation[piece] = location;
    updateLightKings(piece, location);
  }

  const updateLightKings = (piece, location) => {
    if (!location) {
      const index = lightKings.indexOf(piece);
      if (index !== -1) {
        lightKings.splice(index, 1);
      }
    } else if (+location[1] === BoardLimits.bottom && lightKings.indexOf(piece) === -1) {
      lightKings.push(piece);
    }
  }

  const getLightKings = () => {
    return lightKings;
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
    getPieceRemoved,
    getDarkkings,
    getLightKings,
  };
})()