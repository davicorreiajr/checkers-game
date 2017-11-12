import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';
import { IsMovementDiagonalUseCase } from './is-movement-diagonal.use-case';
import { IsJumpMovementUseCase } from './is-jump-movement.use-case';

export const ValidateMovementUseCase = (() => {
  const execute = (origin, destination) => {
    if (!isPieceGoingToSquareThatBelongsToIt(destination) || !isPieceGoingToEmptySquare(destination)) {
      return false;
    }

    const correctDirection = PlayerDataSource.getPlayerTurn() === Player.one ? destination[1] > origin[1] : destination[1] < origin[1];
    return (isDiagonalMovement(origin, destination) && correctDirection) || isJumpMovement(origin, destination);
  }

  const isPieceGoingToSquareThatBelongsToIt = (destination) => {
    const possiblePiecesLocation = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getDarkPiecesPossibleLocation() : PiecesDataSource.getLightPiecesPossibleLocation();
    return arrayContainsItem(possiblePiecesLocation, destination);
  }

  const isPieceGoingToEmptySquare = (destination) => {
    const currentPiecesLocation = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getDarkPiecesLocation() : PiecesDataSource.getLightPiecesLocation();  
    return !arrayContainsItem(Object.values(currentPiecesLocation), destination);
  }

  const isDiagonalMovement = (origin, destination) => {
    return IsMovementDiagonalUseCase.execute(origin, destination);
  }

  const isJumpMovement = (origin, destination) => {
    return IsJumpMovementUseCase.execute(origin, destination);
  }

  const arrayContainsItem = (array, item) => {
    return array.indexOf(item) != -1;
  }

  return { execute };
})()