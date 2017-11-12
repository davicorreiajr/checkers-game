import { GameDataSource } from '../datasource/game.datasource';

export const GetWhoWonUseCase = (() => {
  const execute = () => {
    return GameDataSource.getWhoWon();
  }

  return { execute };
})()