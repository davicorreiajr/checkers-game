import { PiecesDataSource } from '../datasource/pieces.datasource';

export const GetRemovedPieceUseCase = (() => {
  const execute = () => {
    return PiecesDataSource.getPieceRemoved();
  }

  return { execute };
})()