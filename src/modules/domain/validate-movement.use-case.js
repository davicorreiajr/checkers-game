import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';
import { IsMovementDiagonalUseCase } from './is-movement-diagonal.use-case';
import { GetJumpedSquareUseCase } from './get-jumped-square.use-case';
import { CouldPieceDoJumpMovementUseCase } from './could-piece-do-jump-movement.use-case';

export const ValidateMovementUseCase = (() => {
  let destinationOfPreviousJump;

  const execute = (origin, destination) => {
    PlayerDataSource.getTurnEmitter()
      .subscribe(turn => destinationOfPreviousJump = undefined);
    
    if (!isPieceGoingToSquareThatBelongsToIt(destination) || !isPieceGoingToEmptySquare(destination)) {
      return false;
    }

    if (destinationOfPreviousJump && origin !== destinationOfPreviousJump) {
      return false;
    }

    const jumpedSquare = GetJumpedSquareUseCase.execute(origin, destination);
    setDestinationOfPreviousJump(jumpedSquare, destination);

    return (isDiagonalMovement(origin, destination) && getCorrectDirection(origin, destination) && !shouldDoJumpMovement(origin)) ||
      jumpedSquare
  }

  const isPieceGoingToSquareThatBelongsToIt = (destination) => {
    const possibleLocations = PiecesDataSource.getPossibleLocations()
    return arrayContainsItem(possibleLocations, destination);
  }

  const isPieceGoingToEmptySquare = (destination) => {
    const currentPiecesLocation = getAllPiecesLocation();
    return !arrayContainsItem(Object.values(currentPiecesLocation), destination);
  }

  const getAllPiecesLocation = () => {
    const lightPiecesLocation = PiecesDataSource.getLightPiecesLocation();
    const darkPiecesLocation = PiecesDataSource.getDarkPiecesLocation();
    return Object.values(lightPiecesLocation).concat(Object.values(darkPiecesLocation));
  }

  const isDiagonalMovement = (origin, destination) => {
    return IsMovementDiagonalUseCase.execute(origin, destination);
  }

  const getCorrectDirection = (origin, destination) => {
    const kings = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getDarkkings() : PiecesDataSource.getLightKings();

    return isOriginFromKingPiece(kings, origin) ? true :
      PlayerDataSource.getPlayerTurn() === Player.one ? destination[1] > origin[1] : destination[1] < origin[1];
  }

  const isOriginFromKingPiece = (kings, origin) => {
    const currentPiecesLocation = getPiecesLocation();
    let response = false;
    kings.forEach(king => {
      response = currentPiecesLocation[king] === origin ? true : response;
    })
    return response;
  }

  const shouldDoJumpMovement = (origin) => {
    if (!destinationOfPreviousJump) {
      const currentPiecesLocation = Object.values(getPiecesLocation());
      let response = false;
  
      currentPiecesLocation
        .filter(location => location) // remove falsy locations
        .forEach(location => {
          response = couldDoJumpMovement(location) ? true : response;
        })
      return response;
    } else {
      return couldDoJumpMovement(origin);
    }
  }

  const couldDoJumpMovement = (origin) => {
    return CouldPieceDoJumpMovementUseCase.execute(origin);
  }

  const setDestinationOfPreviousJump = (jumpedSquare, destination) => {
    destinationOfPreviousJump = jumpedSquare ? destination : undefined;
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