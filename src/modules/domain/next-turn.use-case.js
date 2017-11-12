import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';
import { GetJumpedSquareUseCase } from './get-jumped-square.use-case';

export const NextTurnUseCase = (() => {
  const execute = (origin, destination) => {
    updateOwnPiecesLocation(origin, destination);
    updateOpponentPiecesLocation(origin, destination);
    changeTurn();
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

  const updateOpponentPiecesLocation = (origin, destination) => {
    const piecesLocation = getOpponentPiecesLocation();
    const jumpedSquare = GetJumpedSquareUseCase.execute(origin, destination);
    console.log('jumpedSquare', jumpedSquare);
    if (jumpedSquare > -1) {
      Object.keys(piecesLocation).forEach(key => {
        if (+key === jumpedSquare) {
          console.log('inside if');
          if (PlayerDataSource.getPlayerTurn() === Player.one) {
            PiecesDataSource.setLightPieceLocation(key, null);
          } else {
            PiecesDataSource.setDarkPieceLocation(key, null);
          }
        }
      })
    }

    console.log('getOwnPiecesLocation', getOwnPiecesLocation());
    console.log('getOpponentPiecesLocation', getOpponentPiecesLocation());
  }

  const getOwnPiecesLocation = () => {
    return PlayerDataSource.getPlayerTurn() === Player.one ? PiecesDataSource.getDarkPiecesLocation() : PiecesDataSource.getLightPiecesLocation();
  }

  const getOpponentPiecesLocation = () => {
    return PlayerDataSource.getPlayerTurn() === Player.one ? PiecesDataSource.getLightPiecesLocation() : PiecesDataSource.getDarkPiecesLocation();
  }

  const changeTurn = () => {
    const nextTurn = PlayerDataSource.getPlayerTurn() === Player.one ?
      Player.two : Player.one
    PlayerDataSource.setPlayerTurn(nextTurn);
  }

  return { execute };
})()