import { Player, BoardLimits } from '../shared/constants'
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const CouldPieceDoJumpMovementUseCase = (() => {
  const execute = (origin) => {
    let couldPieceDoJumpMovement = false;
    const neighborSquares = getNeighborSquares(origin);
    const jumpedSquares = getJumpedSquareMap(origin);
    const opponentPiecesLocation = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getLightPiecesLocation() : PiecesDataSource.getDarkPiecesLocation();

    Object.keys(neighborSquares).forEach(key => {
      if (
        neighborSquares[key] &&
        arrayContainsItem(Object.values(opponentPiecesLocation), neighborSquares[key]) &&
        isSquareEmpty(jumpedSquares[key])
      ) {
        couldPieceDoJumpMovement = true;
      }
    });
    return couldPieceDoJumpMovement;
  }

  const getNeighborSquares = (square) => {
    return {
      se: getNSoutheastDiagonal(square, 1),
      ne: getNNortheastDiagonal(square, 1),
      nw: getNNorthwestDiagonal(square, 1),
      sw: getNSouthwestDiagonal(square, 1),
    };
  }

  const getJumpedSquareMap = (square) => {
    return {
      se: getNSoutheastDiagonal(square, 2),
      ne: getNNortheastDiagonal(square, 2),
      nw: getNNorthwestDiagonal(square, 2),
      sw: getNSouthwestDiagonal(square, 2),
    }
  }

  const isSquareEmpty = (location) => {
    return location ? !arrayContainsItem(getAllPiecesLocation(), location) : false;
  }

  const getAllPiecesLocation = () => {
    const lightPiecesLocation = PiecesDataSource.getLightPiecesLocation();
    const darkPiecesLocation = PiecesDataSource.getDarkPiecesLocation();
    return Object.values(lightPiecesLocation).concat(Object.values(darkPiecesLocation));
  }

  const arrayContainsItem = (array, item) => {
    return array.indexOf(item) != -1;
  }

  const getNSoutheastDiagonal = (pieceLocation, n) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter + n;
    const newLocationNumber = locationNumber - n;

    return newLocationLetter > BoardLimits.right.charCodeAt(0) || newLocationNumber < BoardLimits.bottom ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  const getNNortheastDiagonal = (pieceLocation, n) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter + n;
    const newLocationNumber = locationNumber + n;

    return newLocationLetter > BoardLimits.right.charCodeAt(0) || newLocationNumber > BoardLimits.top ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  const getNNorthwestDiagonal = (pieceLocation, n) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter - n;
    const newLocationNumber = locationNumber + n;

    return newLocationLetter < BoardLimits.left.charCodeAt(0) || newLocationNumber > BoardLimits.top ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  const getNSouthwestDiagonal = (pieceLocation, n) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter - n;
    const newLocationNumber = locationNumber - n;

    return newLocationLetter < BoardLimits.left.charCodeAt(0) || newLocationNumber < BoardLimits.bottom ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }
 
  return { execute };
})()