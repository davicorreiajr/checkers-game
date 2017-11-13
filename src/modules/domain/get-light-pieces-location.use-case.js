import { PiecesDataSource } from '../datasource/pieces.datasource';

export const GetLightPiecesLocationUseCase = (() => {
  const execute = () => {
    return PiecesDataSource.getLightPiecesLocation();
  }

  return { execute };
})()