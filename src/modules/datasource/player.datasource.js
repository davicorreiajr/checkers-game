import { Player } from '../shared/constants';

export const PlayerDataSource = (() => {
  const turn = Player.one;

  const getPlayerTurn = () => {
    return turn;
  }

  const setPlayerTurn = (newTurn) => {
    turn = newTurn;
  }
})()