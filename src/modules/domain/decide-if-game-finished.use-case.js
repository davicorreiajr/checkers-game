import { BehaviorSubject } from 'rxjs';
import { PlayerVictorious, Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';
import { GameDataSource } from '../datasource/game.datasource';
import { VerifyPossibleMovementsUseCase } from './verify-possible-movements.use-case';

export const DecideIfGameFinishedUseCase = (() => {
  const execute = () => {
    VerifyPossibleMovementsUseCase.execute()
      .subscribe(
        isPossibleToMove => checkForMovementPossibilty(isPossibleToMove),
        error => console.log(error) // for debug purposes
      );

    PiecesDataSource.getPieceRemoved()
      .subscribe(
        location => verifyIfGameFinished(location),
        error => console.log(error) // for debug purposes
      );
  }

  const checkForMovementPossibilty = (isPossibleToMove) => {
    const turn = PlayerDataSource.getPlayerTurn()
    if (turn === Player.one && !isPossibleToMove) {
      GameDataSource.setWhoWon(PlayerVictorious.two)
    } else if (turn === Player.two && !isPossibleToMove) {
      GameDataSource.setWhoWon(PlayerVictorious.one)
    }
  }

  const verifyIfGameFinished = (location) => {
    const darkPiecesLocation = getDarkPiecesLocation();
    const lightPiecesLocation = getLightPiecesLocation();

    const darkPiecesLost = Object.keys(darkPiecesLocation)
      .filter(key => darkPiecesLocation[key] && darkPiecesLocation[key] !== location)
      .length === 0;
    
    const lightPiecesLost = Object.keys(lightPiecesLocation)
      .filter(key => lightPiecesLocation[key] && lightPiecesLocation[key] !== location)
      .length === 0;
    
    const decision = getFinalDecision(darkPiecesLost, lightPiecesLost);
    GameDataSource.setWhoWon(decision);
  }

  const getFinalDecision = (darkPiecesLost, lightPiecesLost) => {
    if (!darkPiecesLost && lightPiecesLost) {
      return PlayerVictorious.one;
    } else if (darkPiecesLost && !lightPiecesLost) {
      return PlayerVictorious.two;
    } else {
      return PlayerVictorious.none;
    }
  }

  const getDarkPiecesLocation = () => {
    return PiecesDataSource.getDarkPiecesLocation();
  }

  const getLightPiecesLocation = () => {
    return PiecesDataSource.getLightPiecesLocation();
  }

  return { execute };
})()