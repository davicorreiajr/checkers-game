import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const ResetGameUseCase = (() => {
  const execute = () => {
    PiecesDataSource.resetAllPiecesToInitialLocation();
    PlayerDataSource.setPlayerTurn(Player.one);
  }

  return { execute };
})()