import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';
import { GetJumpedSquareUseCase } from './get-jumped-square.use-case';
import { CouldPieceDoJumpMovementUseCase } from './could-piece-do-jump-movement.use-case';

export const NextTurnUseCase = (() => {
  const execute = (origin, destination) => {
    updateOwnPiecesLocation(origin, destination);

    const jumpedSquare = GetJumpedSquareUseCase.execute(origin, destination);
    updateOpponentPiecesLocation(jumpedSquare);
    setTurn(jumpedSquare, destination);
  }

  const updateOwnPiecesLocation = (origin, destination) => {
    const piecesLocation = getOwnPiecesLocation();
    Object.keys(piecesLocation).forEach(key => {
      if (piecesLocation[key] === origin) {
        if (PlayerDataSource.getPlayerTurn() === Player.one) {
          PiecesDataSource.setDarkPieceLocation(key, destination);
        } else {
          PiecesDataSource.setLightPieceLocation(key, destination);
        }
      }
    })
  }

  const updateOpponentPiecesLocation = (jumpedSquare) => {
    const piecesLocation = getOpponentPiecesLocation();
    if (jumpedSquare) {
      Object.keys(piecesLocation).forEach(key => {
        if (piecesLocation[key] === jumpedSquare) {
          if (PlayerDataSource.getPlayerTurn() === Player.one) {
            PiecesDataSource.setLightPieceLocation(key, null);
          } else {
            PiecesDataSource.setDarkPieceLocation(key, null);
          }
        }
      })
    }
  }

  const getOwnPiecesLocation = () => {
    return PlayerDataSource.getPlayerTurn() === Player.one ? PiecesDataSource.getDarkPiecesLocation() : PiecesDataSource.getLightPiecesLocation();
  }

  const getOpponentPiecesLocation = () => {
    return PlayerDataSource.getPlayerTurn() === Player.one ? PiecesDataSource.getLightPiecesLocation() : PiecesDataSource.getDarkPiecesLocation();
  }

  const setTurn = (jumpedSquare, destination) => {
    const shouldKeepTurn = jumpedSquare && CouldPieceDoJumpMovementUseCase.execute(destination);
    const nextTurn = shouldKeepTurn ?
      PlayerDataSource.getPlayerTurn() : changeTurn();
    PlayerDataSource.setPlayerTurn(nextTurn);
  }

  const changeTurn = () => {
    return PlayerDataSource.getPlayerTurn() === Player.one ?
      Player.two : Player.one
  }

  return { execute };
})()