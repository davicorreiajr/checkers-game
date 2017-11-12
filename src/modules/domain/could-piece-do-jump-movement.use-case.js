import { Player, BoardLimits } from '../shared/constants'
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';
import { DoesSquareContainPieceUseCase } from './does-square-contain-piece.use-case';

const originBoardLetter = origin[0].charCodeAt(0);
const originBoardNumber = +origin[1];

export const CouldPieceDoJumpMovementUseCase = (() => {
  const execute = (origin) => {
    const neighborSquares = getNeighborSquares(origin);
    const opponentPiecesLocation = PlayerDataSource.getPlayerTurn() === Player.one ?
      PiecesDataSource.getLightPiecesLocation() : PiecesDataSource.getDarkPiecesLocation();
    
    Object.keys(neighborSquares).forEach(key => {
      if (
        neighborSquares[key] &&
        arrayContainsItem(opponentPiecesLocation, neighborSquares[key]) &&
        isSquareEmpty(jumpedSquareMap[key](origin))
      ) {
        return true;
      }
    });
    return false;
  }

  const getNeighborSquares = (square) => {
    return {
      bottom: neighborSquareMap.bottom(square),
      right: neighborSquareMap.right(square),
      top: neighborSquareMap.top(square),
      left: neighborSquareMap.left(square)
    };
  }

  const isSquareEmpty = (location) => {
    return location ? DoesSquareContainPieceUseCase.execute(location) : false;
  }

  const arrayContainsItem = (array, item) => {
    return array.indexOf(item) != -1;
  }

  const neighborSquareMap = {
    bottom: (square) => getBottomJumpedSquare(square, 1),
    right: (square) => getRightJumpedSquare(square, 1),
    top: (square) => getTopJumpedSquare(square, 1),
    left: (square) => getLeftJumpedSquare(square, 1),
  }

  const jumpedSquareMap = {
    bottom: (square) => getBottomJumpedSquare(square, 2),
    right: (square) => getRightJumpedSquare(square, 2),
    top: (square) => getTopJumpedSquare(square, 2),
    left: (square) => getLeftJumpedSquare(square, 2),
  }

  const getNSquaresBottom = (square, n) => {
    const newSquareNumber = +origin[1] - n;
    return newSquareNumber < BoardLimits.bottom ?
      undefined : square[0] + newSquareNumber.toString();
  }

  const getNSquaresRight = (square, n) => {
    const newSquareLetter = origin[0].charCodeAt(0) + n;
    return newSquareLetter > BoardLimits.right.charCodeAt(0) ?
      undefined : String.fromCharCode(newSquareLetter) + square[1];
  }

  const getNSquaresTop = (square, n) => {
    const newSquareNumber = +origin[1] + n;
    return newSquareNumber > BoardLimits.top ?
      undefined : square[0] + newSquareNumber.toString();
  }

  const getNSquaresBottom = (square, n) => {
    const newSquareLetter = origin[0].charCodeAt(0) - n;
    return newSquareLetter < BoardLimits.left.charCodeAt(0) ?
      undefined : String.fromCharCode(newSquareLetter) + square[1];
  }
 
  return { execute };
})()