export const PiecesDataSource = (() => {
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

  const getLightPiecesLocation = () => {
    return lightPiecesLocation;
  }

  const getDarkPiecesInitialLocation = () => {
    return ['A1', 'C1', 'E1', 'G1', 'B2', 'D2', 'F2', 'H2', 'A3', 'C3', 'E3', 'G3'];
  }

  const getLightPiecesInitialLocation = () => {
    return ['A8', 'C8', 'E8', 'G8', 'B7', 'D7', 'F7', 'H7', 'A6', 'C6', 'E6', 'G6'];
  }

  return {
    getDarkPiecesLocation,
    getLightPiecesLocation,
    getDarkPiecesInitialLocation,
    getLightPiecesInitialLocation
  };
})()