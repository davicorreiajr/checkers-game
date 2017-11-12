import { BehaviorSubject } from 'rxjs';
import { PlayerVictorious } from '../shared/constants';

export const GameDataSource = (() => {
  let whoWon = new BehaviorSubject(PlayerVictorious.none);

  const getWhoWon = () => {
    return whoWon;
  }

  const setWhoWon = (decision) => {
    whoWon.next(decision);
  }

  return {
    getWhoWon,
    setWhoWon,
  }
})()