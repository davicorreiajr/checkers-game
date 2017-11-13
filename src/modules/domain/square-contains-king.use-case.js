import { PiecesDataSource } from '../datasource/pieces.datasource';

export const SquareContainsKing = (() => {
  const execute = (square) => {
    if (!square) {
      return false;
    }
    
    const darkKings = PiecesDataSource.getDarkkings();
    const lightKings = PiecesDataSource.getLightKings();
    const darkPiecesLocation = PiecesDataSource.getDarkPiecesLocation();
    const lightPiecesLocation = PiecesDataSource.getLightPiecesLocation();
    let response;

    Object.keys(darkPiecesLocation).forEach(piece => {
      if (darkPiecesLocation[piece]) {
        response = darkKings.indexOf(piece) > -1 ? true : response;
      }
    })

    Object.keys(lightPiecesLocation).forEach(piece => {
      if (lightPiecesLocation[piece]) {
        response = lightKings.indexOf(piece) > -1 ? true : response;
      }
    })

    return response;
  }

  return { execute };
})()