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
    0: 'B8',
    1: 'D8',
    2: 'F8',
    3: 'H8',
    4: 'A7',
    5: 'C7',
    6: 'E7',
    7: 'G7',
    8: 'B6',
    9: 'D6',
    10: 'F6',
    11: 'H6',
  }

  const getDarkPiecesLocation = () => {
    return darkPiecesLocation;
  }

  const getLightPiecesLocation = () => {
    return lightPiecesLocation;
  }

  return {
    getDarkPiecesLocation,
    getLightPiecesLocation
  };
})()