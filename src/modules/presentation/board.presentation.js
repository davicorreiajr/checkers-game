import { GetLightPiecesLocationUseCase } from '../domain/get-light-pieces-location.use-case';
import { GetDarkPiecesLocationUseCase } from '../domain/get-dark-pieces-location.use-case';
import { SquareBelongsToDarkPieces } from '../domain/square-belongs-to-dark-pieces.use-case';

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
    console.log('destinationSquare', destinationSquare)
  }

  const addCssClass = (cssClass, elementId) => {
    document.getElementById(elementId).classList.add(cssClass);
  }

  return {
    setPiecesLocation,
    selectSquare
  };
})()

window.BoardPresentation = BoardPresentation;