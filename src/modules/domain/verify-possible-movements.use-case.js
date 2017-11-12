import { BehaviorSubject } from 'rxjs';
import { PlayerVictorious, Player } from '../shared/constants';
import { PlayerDataSource } from '../datasource/player.datasource';
import { PiecesDataSource } from '../datasource/pieces.datasource';

export const VerifyPossibleMovementsUseCase = (() => {
  let possibleMovements = new BehaviorSubject(true);

  const execute = () => {
    PlayerDataSource.getTurnEmitter()
      .subscribe(
        turn => emitPossibleMovements(turn),
        error => console.log(error) // for debug purposes
      );
    return possibleMovements;
  }

  const emitPossibleMovements = (turn) => {
    const piecesLocation = getPiecesLocation(turn);
    let isPossible = false;
    Object.keys(piecesLocation)
      .filter(key => piecesLocation[key]) // get no falsy locations
      .forEach(key => {
        isPossible = canPieceMove(key, turn) ? true : isPossible;
      })

    possibleMovements.next(isPossible);
  }

  const canPieceMove = (piece, turn) => {
    return true;
  }

  const getPiecesLocation = (turn) => {
    return turn === Player.one ?
      PiecesDataSource.getDarkPiecesLocation() : PiecesDataSource.getLightPiecesLocation();
  }

  return { execute };
})()