import { Player } from '../shared/constants';
import { GetLightPiecesLocationUseCase } from '../domain/get-light-pieces-location.use-case';
import { GetDarkPiecesLocationUseCase } from '../domain/get-dark-pieces-location.use-case';
import { SquareBelongsToDarkPieces } from '../domain/square-belongs-to-dark-pieces.use-case';
import { GetCurrentTurnUseCase } from '../domain/get-current-turn.use-case';
import { NextTurnUseCase } from '../domain/next-turn.use-case';

export const BoardPresentation = (() => {
  let squareSelected;

  const setPiecesLocation = () => {
    const lightPiecesLocation = GetLightPiecesLocationUseCase.execute();
    const darkPiecesLocation = GetDarkPiecesLocationUseCase.execute();

    Object.keys(lightPiecesLocation).forEach(key => {
      const location = lightPiecesLocation[key];
      addCssClass('board-piece--white', location);
      addCssClass('cursor-pointer', location);
    });

    Object.keys(darkPiecesLocation).forEach(key => {
      const location = darkPiecesLocation[key];
      addCssClass('board-piece--black', location);
      addCssClass('cursor-pointer', location);
    });
  }

  const selectSquare = (squareLocation) => {
    if (!squareSelected) {
      squareSelected = squareLocation;
      console.log('squareSelected', squareSelected);
    } else {
      tryToMakeTheMove(squareLocation);
    }
  }

  const tryToMakeTheMove = (destinationSquare) => {
    if (true) { // change to verify if this movement is correct
      const currentTurn = GetCurrentTurnUseCase.execute();
      const cssClass = currentTurn === Player.one ? 'board-piece--black' : 'board-piece--white';
      removeCssClass(cssClass, squareSelected);
      removeCssClass('cursor-pointer', squareSelected)
      addCssClass(cssClass, destinationSquare);
      addCssClass('cursor-pointer', destinationSquare);
      squareSelected = undefined;
      NextTurnUseCase.execute();
    } else {
      console.log('wrong movement'); // change to show a msg
    }
  }

  const addCssClass = (cssClass, elementId) => {
    document.getElementById(elementId).classList.add(cssClass);
  }

  const removeCssClass = (cssClass, elementId) => {
    document.getElementById(elementId).classList.remove(cssClass);
  }

  return {
    setPiecesLocation,
    selectSquare
  };
})()

window.BoardPresentation = BoardPresentation;