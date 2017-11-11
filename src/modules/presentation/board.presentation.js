import { GetLightPiecesLocationUseCase } from '../domain/get-light-pieces-location.use-case';
import { GetDarkPiecesLocationUseCase } from '../domain/get-dark-pieces-location.use-case';

export const BoardPresentation = (() => {
  function test(str) {
    console.log(str + 'module');
  }

  const onStart = () => {
    setPiecesLocation();
  }

  const setPiecesLocation = () => {
    const lightPiecesLocation = GetLightPiecesLocationUseCase.execute();
    const darkPiecesLocation = GetDarkPiecesLocationUseCase.execute();

    console.log('lightPiecesLocation', lightPiecesLocation);
    console.log('darkPiecesLocation', darkPiecesLocation);
  }

  return {
    onStart,
    setPiecesLocation
  };
})()

window.BoardPresentation = BoardPresentation;