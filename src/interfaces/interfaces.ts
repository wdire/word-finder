import React from 'react';

export type CellType = {
  id: string;
  value: string;
  x: number;
  y: number;
  ref: React.RefObject<HTMLDivElement>;
};

export type BoardType = {
  cells: CellType[];
};

export type GameType = {
  board: BoardType;
  _states: GameState;
};

export type SelectionType = { cells: CellType[]; word: string };

export type GameState = {
  cell_selected_down?: CellType;
  cell_selected_up?: CellType;
  selections?: SelectionType[];
};

export type GameActionType =
  | { type: 'select_cell_down'; payload: HTMLDivElement }
  | { type: 'select_cell_up'; payload: HTMLDivElement }
  | { type: 'reset_cell_select' };

export type SelectCellType = 'down' | 'up';

export type PlotType = { x: number; y: number };

export type CellsBetweenSelectionType = CellType[] | false;
