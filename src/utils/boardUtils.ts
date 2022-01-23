import { CellType } from '../interfaces/interfaces';

export const getRowsCount = (cells: CellType[]) => {
  return cells[cells.length - 1].y + 1;
};

export const getColumnsCount = (cells: CellType[]) => {
  return cells[cells.length - 1].x + 1;
};

export const getRow = (cells: CellType[], row: number) => {
  return cells.filter((cell) => cell.y === row);
};

export const getCellById = (cells: CellType[], id: string): CellType => {
  return cells.filter((cell) => cell.id === id)[0];
};
