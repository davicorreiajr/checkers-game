import { PlayerDataSource } from '../datasource/player.datasource';
import { Player } from '../shared/constants';

export const NextTurnUseCase = (() => {
  const execute = () => {
    const nextTurn = PlayerDataSource.getPlayerTurn() === Player.one ?
      Player.two : Player.one
    PlayerDataSource.setPlayerTurn(nextTurn);
  }

  return { execute };
})()