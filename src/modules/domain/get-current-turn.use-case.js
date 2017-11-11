import { PlayerDataSource } from '../datasource/player.datasource';

export const GetCurrentTurnUseCase = (() => {
  const execute = () => {
    return PlayerDataSource.getPlayerTurn();
  }

  return { execute }
})()