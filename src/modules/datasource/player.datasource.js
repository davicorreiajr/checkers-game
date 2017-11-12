import { Player } from '../shared/constants';

export const PlayerDataSource = (() => {
  let turn = Player.one;

  const getPlayerTurn = () => {
    return turn;
  }

  const setPlayerTurn = (newTurn) => {
    turn = newTurn;
  }

  return {
    getPlayerTurn,
    setPlayerTurn
  };
})()