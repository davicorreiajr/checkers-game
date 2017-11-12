import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const IsJumpMovementUseCase = (() => {
  const execute = (origin, destination) => {
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

  return { execute };
})()