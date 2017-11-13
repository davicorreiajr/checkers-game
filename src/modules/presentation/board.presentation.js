import { Player, PlayerVictorious } from '../shared/constants';
import { GetLightPiecesLocationUseCase } from '../domain/get-light-pieces-location.use-case';
import { GetDarkPiecesLocationUseCase } from '../domain/get-dark-pieces-location.use-case';
import { GetCurrentTurnUseCase } from '../domain/get-current-turn.use-case';
import { NextTurnUseCase } from '../domain/next-turn.use-case';
import { ValidateMovementUseCase } from '../domain/validate-movement.use-case';
import { DoesSquareContainPieceUseCase } from  '../domain/does-square-contain-piece.use-case';
import { GetRemovedPieceUseCase } from '../domain/get-removed-piece.use-case';
import { DecideIfGameFinishedUseCase } from '../domain/decide-if-game-finished.use-case';
import { GetWhoWonUseCase } from '../domain/get-who-won.use-case';
import { ResetGameUseCase } from '../domain/reset-game.use-case';

export const BoardPresentation = (() => {
  let squareSelected;
  const middleSquares = ['A4', 'B5', 'C4', 'D5', 'E4', 'F5', 'G4', 'H5'];

  const onInit = () => {
    subscribeToRemovedPieces();
    subscribeToGameDecision();
  }

  const onStart = () => {
    let button = document.getElementById('startButton');
    button.onclick = () => onReset();
    button.firstChild.data = 'Reset game';
    setPiecesLocation();
  }

  const onReset = () => {
    ResetGameUseCase.execute();
    middleSquares.forEach(square => {
      removeCssClass('board-piece--white', square);
      removeCssClass('board-piece--black', square);
      removeCssClass('cursor-pointer', square);
    })
    updateTurnBoard();
    setPiecesLocation();
  }

  const subscribeToRemovedPieces = () => {
    GetRemovedPieceUseCase.execute()
      .subscribe(
        location => {
          removeCssClass('board-piece--white', location);
          removeCssClass('board-piece--black', location);
          removeCssClass('cursor-pointer', location);
        },
        error => console.log(error), // for debug purposes
      );
  }

  const subscribeToGameDecision = () => {
    DecideIfGameFinishedUseCase.execute();
    GetWhoWonUseCase.execute()
      .subscribe(
        decision => decideIfShowFinalGameMessage(decision),
        error => console.log(error), // for debug purposes
      );
  }

  const decideIfShowFinalGameMessage = (decision) => {
    if (decision === PlayerVictorious.none) {
      return;
    } else if (decision === PlayerVictorious.one) {
      document.getElementById('finalDecision').innerHTML = '<h4 class="final-decision">Player with dark pieces won!</h4>';
    } else if (decision === PlayerVictorious.two) {
      document.getElementById('finalDecision').innerHTML = '<h4 class="final-decision">Player with light pieces won!</h4>';
    }
  }

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
      squareSelected = DoesSquareContainPieceUseCase.execute(squareLocation) ? squareLocation : undefined;
      if (squareSelected) {
        const cssClass = GetCurrentTurnUseCase.execute() === Player.one ?
          'board-piece--black-selected' : 'board-piece--white-selected';
        addCssClass(cssClass, squareSelected);
      }
    } else {
      tryToMakeTheMove(squareLocation);
    }
  }

  const tryToMakeTheMove = (destinationSquare) => {
    if (ValidateMovementUseCase.execute(squareSelected, destinationSquare)) {
      const currentTurn = GetCurrentTurnUseCase.execute();
      const cssClass = currentTurn === Player.one ? 'board-piece--black' : 'board-piece--white';
      removeCssClass(cssClass, squareSelected);
      removeCssClass('cursor-pointer', squareSelected);
      addCssClass(cssClass, destinationSquare);
      addCssClass('cursor-pointer', destinationSquare);
      NextTurnUseCase.execute(squareSelected, destinationSquare);
      updateTurnBoard();
      setPiecesLocation();
      document.getElementById('messageFail').innerHTML = null;
    } else {
      document.getElementById('messageFail').innerHTML = 'You can not make this movement!';
    }
    
    removeCssClass('board-piece--white-selected', squareSelected);
    removeCssClass('board-piece--black-selected', squareSelected);
    squareSelected = undefined;
  }

  const updateTurnBoard = () => {
    const currentTurn = GetCurrentTurnUseCase.execute();
    addCssClass('scoreboard-player--selected', currentTurn);
    Object.values(Player).forEach(value => {
      if (value !== currentTurn) {
        removeCssClass('scoreboard-player--selected', value);
      }
    })
  }

  const addCssClass = (cssClass, elementId) => {
    if (elementId) {
      document.getElementById(elementId).classList.add(cssClass);
    }
  }

  const removeCssClass = (cssClass, elementId) => {
    if (elementId) {
      document.getElementById(elementId).classList.remove(cssClass);
    }
  }

  return {
    onInit,
    onStart,
    onReset,
    setPiecesLocation,
    selectSquare
  };
})()

window.BoardPresentation = BoardPresentation;