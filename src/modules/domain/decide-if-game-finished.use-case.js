import { BehaviorSubject } from 'rxjs';
import { PlayerVictorious } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';

export const DecideIfGameFinishedUseCase = (() => {
  let whoWon = new BehaviorSubject(PlayerVictorious.none);

  const execute = () => {
    PiecesDataSource.getPieceRemoved()
      .subscribe(
        location => verifyIfGameFinished(location),
        error => console.log(error) // for debug purposes
      );
    
    return whoWon;
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
    whoWon.next(decision);
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