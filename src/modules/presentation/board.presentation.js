import { GetLightPiecesLocationUseCase } from '../domain/get-light-pieces-location.use-case';
import { GetDarkPiecesLocationUseCase } from '../domain/get-dark-pieces-location.use-case';
import { SquareBelongsToDarkPieces } from '../domain/square-belongs-to-dark-pieces.use-case';

export const BoardPresentation = (() => {
  function test(str) {
    console.log(str + 'module');
  }

  const setPiecesLocation = () => {
    const lightPiecesLocation = GetLightPiecesLocationUseCase.execute();
    const darkPiecesLocation = GetDarkPiecesLocationUseCase.execute();

    Object.keys(lightPiecesLocation).forEach(key => {
      const location = lightPiecesLocation[key];
      document.getElementById(location).classList.add('board-piece--white');
    });

    Object.keys(darkPiecesLocation).forEach(key => {
      const location = darkPiecesLocation[key];
      document.getElementById(location).classList.add('board-piece--black');
    });
  }

  return {
    setPiecesLocation
  };
})()

window.BoardPresentation = BoardPresentation;