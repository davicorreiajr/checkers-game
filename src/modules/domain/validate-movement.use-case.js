import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';
import { IsMovementDiagonalUseCase } from './is-movement-diagonal.use-case';
import { GetJumpedSquareUseCase } from './get-jumped-square.use-case';
import { CouldPieceDoJumpMovementUseCase } from './could-piece-do-jump-movement.use-case';

export const ValidateMovementUseCase = (() => {
  const execute = (origin, destination) => {
    if (!isPieceGoingToSquareThatBelongsToIt(destination) || !isPieceGoingToEmptySquare(destination)) {
      return false;
    }

    return (isDiagonalMovement(origin, destination) && getCorrectDirection(origin, destination) && !shouldDoJumpMovement()) ||
      isJumpMovement(origin, destination);
  }

  const isPieceGoingToSquareThatBelongsToIt = (destination) => {
    const possiblePiecesLocation = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getDarkPiecesPossibleLocation() : PiecesDataSource.getLightPiecesPossibleLocation();
    return arrayContainsItem(possiblePiecesLocation, destination);
  }

  const isPieceGoingToEmptySquare = (destination) => {
    const currentPiecesLocation = getPiecesLocation();
    return !arrayContainsItem(Object.values(currentPiecesLocation), destination);
  }

  const isDiagonalMovement = (origin, destination) => {
    return IsMovementDiagonalUseCase.execute(origin, destination);
  }

  const getCorrectDirection = (origin, destination) => {
    const kings = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getDarkkings() : PiecesDataSource.getLightKings();
    
    if (isOriginFromKingPiece(kings, origin)) {
      return true;
    } else {
      return PlayerDataSource.getPlayerTurn() === Player.one ? destination[1] > origin[1] : destination[1] < origin[1];
    }
  }

  const isOriginFromKingPiece = (kings, origin) => {
    const currentPiecesLocation = getPiecesLocation();
    let response = false;
    kings.forEach(king => {
      response = currentPiecesLocation[king] === origin ? true : response;
    })
    return response;
  }

  const shouldDoJumpMovement = () => {
    const currentPiecesLocation = Object.values(getPiecesLocation());
    let response = false;

    currentPiecesLocation
      .filter(location => location) // remove falsy locations
      .forEach(location => {
        response = couldDoJumpMovement(location) ? true : response;
      })

    return response;
  }

  const couldDoJumpMovement = (origin) => {
    return CouldPieceDoJumpMovementUseCase.execute(origin);
  }

  const isJumpMovement = (origin, destination) => {
    return GetJumpedSquareUseCase.execute(origin, destination) > -1;
  }

  const getPiecesLocation = () => {
    return PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getDarkPiecesLocation() : PiecesDataSource.getLightPiecesLocation();
  }

  const arrayContainsItem = (array, item) => {
    return array.indexOf(item) != -1;
  }

  return { execute };
})()