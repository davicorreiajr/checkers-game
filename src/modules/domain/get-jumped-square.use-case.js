import { Player, BoardLimits } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const GetJumpedSquareUseCase = (() => {
  const execute = (origin, destination) => {
    if (isDestinationOutOfBoard(destinationBoardLetter, destinationBoardNumber)) {
      return -1;
    }

    if (!isJumpMovement(origin, destination)) {
      return -1;
    }
    const originBoardLetter = origin[0].charCodeAt(0);
    const originBoardNumber = +origin[1];
    const destinationBoardLetter = destination[0].charCodeAt(0);
    const destinationBoardNumber = +destination[1];

    const jumpedLetter = String.fromCharCode((destinationBoardLetter + originBoardLetter) / 2);
    const jumpedNumber = ((destinationBoardNumber + originBoardNumber) / 2).toString()

    const locationJumped = jumpedLetter + jumpedNumber;
    return Object.values(getOpponentPieces(PlayerDataSource.getPlayerTurn())).indexOf(locationJumped);
  }

  const isDestinationOutOfBoard = (destinationLetter, destinationNumber) => {
    return destinationLetter <= BoardLimits.right.charCodeAt(0) && destinationLetter >= BoardLimits.left.charCodeAt(0)
      && destinationNumber < BoardLimits.top && destinationNumber > BoardLimits.bottom;
  }

  const isJumpMovement = (origin, destination) => {
    const originLetter = origin[0].charCodeAt(0);
    const originNumber = +origin[1];
    const destinationLetter = destination[0].charCodeAt(0);
    const destinationNumber = +destination[1];

    return Math.abs(destinationLetter - originLetter) === 2 && Math.abs(destinationNumber - originNumber) === 2;
  }

  const getOpponentPieces = (turn) => {
    return turn === Player.one ? PiecesDataSource.getLightPiecesLocation() : PiecesDataSource.getDarkPiecesLocation();
  }

  return { execute };
})()