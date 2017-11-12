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

export const BoardPresentation = (() => {
  let squareSelected;

  const onInit = () => {
    subscribeToRemovedPieces();
    subscribeToGameDecision();
  }

  const subscribeToRemovedPieces = () => {
    GetRemovedPieceUseCase.execute()
      .subscribe(
        location => {
          console.log('test', location);
          removeCssClass('board-piece--white', location);
          removeCssClass('board-piece--black', location);
          removeCssClass('cursor-pointer', location);
        },
        error => console.log(error) // for debug purposes
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
      squareSelected = undefined;
    } else {
      squareSelected = undefined;
      console.log('wrong movement'); // change to show a msg
    }
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
    setPiecesLocation,
    selectSquare
  };
})()

window.BoardPresentation = BoardPresentation;