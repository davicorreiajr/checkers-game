import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const DoesSquareContainPieceUseCase = (() => {
  const execute = (piece) => {
    const pieces = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getDarkPiecesLocation() : PiecesDataSource.getLightPiecesLocation();
    return Object.values(pieces).indexOf(piece) > -1;
  }

  return { execute };
})()