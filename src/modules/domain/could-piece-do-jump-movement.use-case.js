import { Player, BoardLimits } from '../shared/constants'
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';
import { DoesSquareContainPieceUseCase } from './does-square-contain-piece.use-case';

const originBoardLetter = origin[0].charCodeAt(0);
const originBoardNumber = +origin[1];

export const CouldPieceDoJumpMovementUseCase = (() => {
  const execute = (origin) => {
    let couldPieceDoJumpMovement = false;
    const neighborSquares = getNeighborSquares(origin);
    const opponentPiecesLocation = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getLightPiecesLocation() : PiecesDataSource.getDarkPiecesLocation();

    Object.keys(neighborSquares).forEach(key => {
      if (
        neighborSquares[key] &&
        arrayContainsItem(Object.values(opponentPiecesLocation), neighborSquares[key]) &&
        isSquareEmpty(jumpedSquareMap[key](origin))
      ) {
        couldPieceDoJumpMovement = true;
      }
    });
    return couldPieceDoJumpMovement;
  }

  const getNeighborSquares = (square) => {
    return {
      bottom: getNSquaresBottom(square, 1),
      right: getNSquaresRight(square, 1),
      top: getNSquaresTop(square, 1),
      left: getNSquaresLeft(square, 1),
    };
  }

  const isSquareEmpty = (location) => {
    return location ? !DoesSquareContainPieceUseCase.execute(location) : false;
  }

  const arrayContainsItem = (array, item) => {
    return array.indexOf(item) != -1;
  }

  const jumpedSquareMap = {
    bottom: (square) => getNSquaresBottom(square, 2),
    right: (square) => getNSquaresRight(square, 2),
    top: (square) => getNSquaresTop(square, 2),
    left: (square) => getNSquaresLeft(square, 2),
  }

  const getNSquaresBottom = (square, n) => {
    const newSquareNumber = +square[1] - n;
    return newSquareNumber < BoardLimits.bottom ?
      undefined : square[0] + newSquareNumber.toString();
  }

  const getNSquaresRight = (square, n) => {
    const newSquareLetter = square[0].charCodeAt(0) + n;
    return newSquareLetter > BoardLimits.right.charCodeAt(0) ?
      undefined : String.fromCharCode(newSquareLetter) + square[1];
  }

  const getNSquaresTop = (square, n) => {
    const newSquareNumber = +square[1] + n;
    return newSquareNumber > BoardLimits.top ?
      undefined : square[0] + newSquareNumber.toString();
  }

  const getNSquaresLeft = (square, n) => {
    const newSquareLetter = square[0].charCodeAt(0) - n;
    return newSquareLetter < BoardLimits.left.charCodeAt(0) ?
      undefined : String.fromCharCode(newSquareLetter) + square[1];
  }
 
  return { execute };
})()