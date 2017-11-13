import { PiecesDataSource } from '../datasource/pieces.datasource';

export const GetDarkPiecesLocationUseCase = (() => {
  const execute = () => {
    return PiecesDataSource.getDarkPiecesLocation();
  }

  return { execute };
})()