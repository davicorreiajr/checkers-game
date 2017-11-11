import { PiecesDataSource } from '../datasource/pieces.datasource';

export const SquareBelongsToDarkPieces = (() => {
  const execute = (squareId) => {
    const darkPiecesInitialLocation = PiecesDataSource.getDarkPiecesInitialLocation();
    return darkPiecesInitialLocation.indexOf(squareId) != -1;
  }

  return { execute };
})()