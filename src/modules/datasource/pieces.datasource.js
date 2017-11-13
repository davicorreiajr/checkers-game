import { ReplaySubject } from 'rxjs';
import _ from 'lodash'
import { BoardLimits, DarkPiecesInitialLocation, LightPiecesInitialLocation } from '../shared/constants';

export const PiecesDataSource = (() => {
  let pieceRemoved = new ReplaySubject();
  let darkKings = [];
  let lightKings = [];

  // let darkPiecesLocation = _.cloneDeep(DarkPiecesInitialLocation);
  // let lightPiecesLocation = _.cloneDeep(LightPiecesInitialLocation);

  let darkPiecesLocation = {
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
    10: 'A6',
    11: 'B7',
  }
  let lightPiecesLocation = {
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
    10: 'A4',
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

  const resetAllPiecesToInitialLocation = () => {
    darkPiecesLocation = _.cloneDeep(DarkPiecesInitialLocation);
    lightPiecesLocation = _.cloneDeep(LightPiecesInitialLocation);
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
    resetAllPiecesToInitialLocation,
  };
})()