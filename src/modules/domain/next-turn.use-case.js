import { PlayerDataSource } from '../datasource/player.datasource';

export const NextTurnUseCase = (() => {
  const execute = (turn) => {
    PlayerDataSource.setPlayerTurn(turn);
  }
})()