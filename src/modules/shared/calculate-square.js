import { BoardLimits } from './constants';

export const CalculateSquare = (() => {
  const getNSoutheastDiagonal = (pieceLocation, n) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter + n;
    const newLocationNumber = locationNumber - n;

    return newLocationLetter > BoardLimits.right.charCodeAt(0) || newLocationNumber < BoardLimits.bottom ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  const getNNortheastDiagonal = (pieceLocation, n) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter + n;
    const newLocationNumber = locationNumber + n;

    return newLocationLetter > BoardLimits.right.charCodeAt(0) || newLocationNumber > BoardLimits.top ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  const getNNorthwestDiagonal = (pieceLocation, n) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter - n;
    const newLocationNumber = locationNumber + n;

    return newLocationLetter < BoardLimits.left.charCodeAt(0) || newLocationNumber > BoardLimits.top ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  const getNSouthwestDiagonal = (pieceLocation, n) => {
    const locationLetter = pieceLocation[0].charCodeAt(0);
    const locationNumber = +pieceLocation[1];

    const newLocationLetter = locationLetter - n;
    const newLocationNumber = locationNumber - n;

    return newLocationLetter < BoardLimits.left.charCodeAt(0) || newLocationNumber < BoardLimits.bottom ?
      undefined : String.fromCharCode(newLocationLetter) + newLocationNumber.toString();
  }

  return {
    getNNortheastDiagonal,
    getNNorthwestDiagonal,
    getNSoutheastDiagonal,
    getNSouthwestDiagonal
  }
})()