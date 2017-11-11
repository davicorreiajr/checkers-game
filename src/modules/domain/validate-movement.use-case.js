import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const ValidateMovementUseCase = (() => {
  const execute = (origin, destination) => {
    const possiblePiecesLocation = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getDarkPiecesPossibleLocation() : PiecesDataSource.getLightPiecesPossibleLocation();
    
    if (!arrayContainsItem(possiblePiecesLocation, destination)) {
      return false;
    }

    const correctDirection = PlayerDataSource.getPlayerTurn() === Player.one ? destination[1] > origin[1] : destination[1] < origin[1];
    return (isDiagonalMovement(origin, destination) && correctDirection) || isJumpMovement(origin, destination);
  }

  const isDiagonalMovement = (origin, destination) => {
    const originBoardLetter = origin[0].charCodeAt(0);
    const originBoardNumber = origin[1];
    const destinationBoardLetter = destination[0].charCodeAt(0);
    const destinationBoardNumber = destination[1];

    return Math.abs(originBoardLetter - destinationBoardLetter) === 1 && Math.abs(originBoardNumber - destinationBoardNumber) === 1;
  }

  const isJumpMovement = (origin, destination) => {
    const originBoardLetter = origin[0].charCodeAt(0);
    const originBoardNumber = +origin[1];
    const destinationBoardLetter = destination[0].charCodeAt(0);
    const destinationBoardNumber = +destination[1];

    if (originBoardLetter === destinationBoardLetter) {
      if (Math.abs(originBoardNumber - destinationBoardNumber) !== 2) {
        return false
      }
      const locationJumped = String.fromCharCode(originBoardLetter) + ((originBoardNumber+destinationBoardNumber)/2).toString();
      return Object.values(getOpponentPieces(PlayerDataSource.getPlayerTurn())).indexOf(locationJumped) > -1
    } else if (originBoardNumber === destinationBoardNumber) {
      if (Math.abs(originBoardLetter - destinationBoardLetter) !== 2) {
        return false
      }
      const locationJumped = String.fromCharCode((originBoardLetter+destinationBoardLetter)/2) + originBoardNumber.toString();
      return Object.values(getOpponentPieces(PlayerDataSource.getPlayerTurn())).indexOf(locationJumped) > -1
    }

    return false;
  }

  const getOpponentPieces = (turn) => {
    return turn === Player.one ? PiecesDataSource.getLightPiecesLocation() : PiecesDataSource.getDarkPiecesLocation();
  }

  const arrayContainsItem = (array, item) => {
    return array.indexOf(item) != -1;
  }

  return { execute };
})()