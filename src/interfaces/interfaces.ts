import React from 'react';

export type CellType = {
  id: string;
  value: string;
  point: PointType;
  ref: React.RefObject<HTMLDivElement>;
  available: boolean;
  style?: React.CSSProperties;
  class_name?: string;
};

export type BoardType = {
  cells: CellType[];
  sizeX: number;
  sizeY: number;
};

export type GameType = {
  board: BoardType;
  words: string[];
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
  | { type: 'reset_cell_select' }
  | { type: 'test_start' };

export type SelectCellType = 'down' | 'up';

export type PointType = { x: number; y: number };

export type CellsBetweenSelectionType = CellType[] | false;

export type WritePointsType = {
  start: PointType;
  end: PointType;
};

export type BasicDirType = 'top' | 'left' | 'bottom' | 'right';

export type AddedWordType = {
  word: string;
  points: PointType[];
};

export type AvailabilityCalcType = {
  top: {
    available: boolean;
    end_point: PointType;
  };
  left: {
    available: boolean;
    end_point: PointType;
  };
  bottom: {
    available: boolean;
    end_point: PointType;
  };
  right: {
    available: boolean;
    end_point: PointType;
  };
};
