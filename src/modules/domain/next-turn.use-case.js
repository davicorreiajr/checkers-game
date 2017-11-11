import { Player } from '../shared/constants';
import { PiecesDataSource } from '../datasource/pieces.datasource';
import { PlayerDataSource } from '../datasource/player.datasource';

export const NextTurnUseCase = (() => {
  const execute = (origin, destination) => {
    updatePiecesLocation(origin, destination);
    changeTurn();
  }

  const updatePiecesLocation = (origin, destination) => {
    const piecesLocation = getPiecesLocation();
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

  const getPiecesLocation = () => {
    return PlayerDataSource.getPlayerTurn() === Player.one ? PiecesDataSource.getDarkPiecesLocation() : PiecesDataSource.getLightPiecesLocation();
  }

  const changeTurn = () => {
    const nextTurn = PlayerDataSource.getPlayerTurn() === Player.one ?
      Player.two : Player.one
    PlayerDataSource.setPlayerTurn(nextTurn);
  }

  return { execute };
})()