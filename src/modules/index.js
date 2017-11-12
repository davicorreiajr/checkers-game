import { BoardPresentation } from './presentation/board.presentation';

console.log('BLAAA');

BoardPresentation.onInit();

window.onload = function() {
  console.log('inside onload');
  window.BoardPresentation = BoardPresentation;
}

document.onload = function() {
  console.log('inside doc onload');
}