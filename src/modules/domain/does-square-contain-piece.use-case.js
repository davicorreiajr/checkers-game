import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const DoesSquareContainPieceUseCase = (() => {
  const execute = (location) => {
    const piecesLocation = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getDarkPiecesLocation() : PiecesDataSource.getLightPiecesLocation();
    return Object.values(piecesLocation).indexOf(location) > -1;
  }

  return { execute };
})()