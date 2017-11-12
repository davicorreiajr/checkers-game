import { ReplaySubject } from 'rxjs';
import { BoardLimits } from '../shared/constants';

export const PiecesDataSource = (() => {
  let pieceRemoved = new ReplaySubject();
  let darkKings = [];
  let lightKings = [];

  const darkPiecesLocation = {
    0: 'B1',
    1: 'D1',
    2: 'F1',
    3: 'H1',
    4: 'A2',
    5: 'C2',
    6: 'E2',
    7: 'G2',
    8: 'B3',
    9: 'D3',
    10: 'F3',
    11: 'H3',
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

  // const darkPiecesLocation = {
  //   0: null,
  //   1: null,
  //   2: null,
  //   3: null,
  //   4: null,
  //   5: null,
  //   6: null,
  //   7: null,
  //   8: null,
  //   9: null,
  //   10: null,
  //   11: 'C5',
  // }

  // const lightPiecesLocation = {
  //   0: 'A2',
  //   1: 'B1',
  //   2: 'C2',
  //   3: 'D1',
  //   4: 'E2',
  //   5: 'F1',
  //   6: 'F3',
  //   7: 'H1',
  //   8: null,
  //   9: null,
  //   10: null,
  //   11: null,
  // }

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

  const getPossibleLocations = () => {
    return [
      'B1', 'D1', 'F1', 'H1', 'A2', 'C2', 'E2', 'G2', 'B3', 'D3', 'F3', 'H3',
      'A4', 'C4', 'E4', 'G4', 'B5', 'D5', 'F5', 'H5', 'A6', 'C6', 'E6', 'G6',
      'B7', 'D7', 'F7', 'H7', 'A8', 'C8', 'E8', 'G8'
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
    getPossibleLocations,
    getPieceRemoved,
    getDarkkings,
    getLightKings,
  };
})()