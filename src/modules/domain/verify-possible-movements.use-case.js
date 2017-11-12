import { BehaviorSubject } from 'rxjs';
import { PlayerVictorious, Player, BoardLimits } from '../shared/constants';
import { PlayerDataSource } from '../datasource/player.datasource';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { CouldPieceDoJumpMovementUseCase } from './could-piece-do-jump-movement.use-case';
import { DoesSquareContainPieceUseCase } from './does-square-contain-piece.use-case';

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
    return couldPieceDoJumpMovement(getPiecesLocation(turn)[piece]) || couldPieceDoDiagonalMovement(piece, turn);
  }

  const couldPieceDoJumpMovement = (originSquare) => {
    return CouldPieceDoJumpMovementUseCase.execute(originSquare);
  }

  const couldPieceDoDiagonalMovement = (piece, turn) => {
    let response = false;
    const pieceLocation = getPiecesLocation(turn)[piece];
    const diagonals = turn === Player.one ?
      getDarkDiagonals(piece, pieceLocation) : getLightDiagonals(piece, pieceLocation);
    
    diagonals.forEach(diagonal => {
      response = !DoesSquareContainPieceUseCase.execute(diagonal) ? true : response;
    })

    return response;
  }

  const getDarkDiagonals = (piece, pieceLocation) => {
    const response = [];
    const allowBackwardsMovement = isDarkKingPiece(piece);
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    response.push(getNortheastDiagonal(pieceLocation));
    response.push(getNorthwestDiagonal(pieceLocation));

    if (allowBackwardsMovement) {
      response.push(getSoutheastDiagonal(pieceLocation));
      response.push(getSouthwestDiagonal(pieceLocation));
    }

    return response.filter(location => location); // remove falsy elements
  }

  const isDarkKingPiece = (piece) => {
    return PiecesDataSource.getDarkkings().indexOf(piece) > -1;
  }

  const getLightDiagonals = (piece, pieceLocation) => {
    const response = [];
    const allowBackwardsMovement = isLightKingPiece(piece);
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    response.push(getSoutheastDiagonal(pieceLocation));
    response.push(getSouthwestDiagonal(pieceLocation));

    if (allowBackwardsMovement) {
      response.push(getNortheastDiagonal(pieceLocation));
      response.push(getNorthwestDiagonal(pieceLocation));
    }

    return response.filter(location => location); // remove falsy elements
  }

  const isLightKingPiece = (piece) => {
    return PiecesDataSource.getLightKings().indexOf(piece) > -1;
  }

  const getPiecesLocation = (turn) => {
    return turn === Player.one ?
      PiecesDataSource.getDarkPiecesLocation() : PiecesDataSource.getLightPiecesLocation();
  }

  const getSoutheastDiagonal = (pieceLocation) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter + 1;
    const newLocationNumber = locationNumber - 1;

    return newLocationLetter > BoardLimits.right.charCodeAt(0) || newLocationNumber < BoardLimits.bottom ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  const getNortheastDiagonal = (pieceLocation) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter + 1;
    const newLocationNumber = locationNumber + 1;

    return newLocationLetter > BoardLimits.right.charCodeAt(0) || newLocationNumber > BoardLimits.top ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  const getNorthwestDiagonal = (pieceLocation) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter - 1;
    const newLocationNumber = locationNumber + 1;

    return newLocationLetter < BoardLimits.left.charCodeAt(0) || newLocationNumber > BoardLimits.top ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  const getSouthwestDiagonal = (pieceLocation) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter - 1;
    const newLocationNumber = locationNumber - 1;

    return newLocationLetter < BoardLimits.left.charCodeAt(0) || newLocationNumber < BoardLimits.bottom ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  return { execute };
})()