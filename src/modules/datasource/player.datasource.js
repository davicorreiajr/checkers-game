import { Subject } from 'rxjs';
import { Player } from '../shared/constants';

export const PlayerDataSource = (() => {
  let turn = Player.one;
  let turnChanged = new Subject();

  const getPlayerTurn = () => {
    return turn;
  }

  const setPlayerTurn = (newTurn) => {
    turn = newTurn;
    turnChanged.next(newTurn);
  }

  const getTurnEmitter = () => {
    return turnChanged;
  }

  return {
    getPlayerTurn,
    setPlayerTurn,
    getTurnEmitter
  };
})()