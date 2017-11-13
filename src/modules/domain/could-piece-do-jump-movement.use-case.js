import { Player, BoardLimits } from '../shared/constants'
import { CalculateSquare } from '../shared/calculate-square';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const CouldPieceDoJumpMovementUseCase = (() => {
  const execute = (origin) => {
    let couldPieceDoJumpMovement = false;
    const neighborSquares = getNeighborSquares(origin);
    const jumpedSquares = getJumpedSquareMap(origin);
    const opponentPiecesLocation = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getLightPiecesLocation() : PiecesDataSource.getDarkPiecesLocation();

    Object.keys(neighborSquares).forEach(key => {
      if (
        neighborSquares[key] &&
        arrayContainsItem(Object.values(opponentPiecesLocation), neighborSquares[key]) &&
        isSquareEmpty(jumpedSquares[key])
      ) {
        couldPieceDoJumpMovement = true;
      }
    });
    return couldPieceDoJumpMovement;
  }

  const getNeighborSquares = (square) => {
    return {
      se: CalculateSquare.getNSoutheastDiagonal(square, 1),
      ne: CalculateSquare.getNNortheastDiagonal(square, 1),
      nw: CalculateSquare.getNNorthwestDiagonal(square, 1),
      sw: CalculateSquare.getNSouthwestDiagonal(square, 1),
    };
  }

  const getJumpedSquareMap = (square) => {
    return {
      se: CalculateSquare.getNSoutheastDiagonal(square, 2),
      ne: CalculateSquare.getNNortheastDiagonal(square, 2),
      nw: CalculateSquare.getNNorthwestDiagonal(square, 2),
      sw: CalculateSquare.getNSouthwestDiagonal(square, 2),
    }
  }

  const isSquareEmpty = (location) => {
    return location ? !arrayContainsItem(getAllPiecesLocation(), location) : false;
  }

  const getAllPiecesLocation = () => {
    const lightPiecesLocation = PiecesDataSource.getLightPiecesLocation();
    const darkPiecesLocation = PiecesDataSource.getDarkPiecesLocation();
    return Object.values(lightPiecesLocation).concat(Object.values(darkPiecesLocation));
  }

  const arrayContainsItem = (array, item) => {
    return array.indexOf(item) != -1;
  }
 
  return { execute };
})()