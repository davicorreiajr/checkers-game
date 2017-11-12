import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const IsMovementDiagonalUseCase = (() => {
  const execute = (origin, destination) => {
    const originBoardLetter = origin[0].charCodeAt(0);
    const originBoardNumber = +origin[1];
    const destinationBoardLetter = destination[0].charCodeAt(0);
    const destinationBoardNumber = +destination[1];

    return Math.abs(originBoardLetter - destinationBoardLetter) === 1 && Math.abs(originBoardNumber - destinationBoardNumber) === 1;
  }

  return { execute };
})()