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
  selections?: SelectionType[];
};

export type GameType = {
  board: BoardType;
  allWords: string[];
  wordsLeft: string[];
  foundWords: string[];
  allWordsNormalCase: WordsNormalCaseType;
  started: boolean;
  gameover: boolean;
  _states: GameState;
};

export type SelectionType = { cells: CellType[]; word: string };

export type GameState = {
  cell_selected_down?: CellType;
  cell_selected_up?: CellType;
  cell_selected_over?: CellType;
};

export type GameActionType =
  | { type: 'select_cell_down'; payload: HTMLDivElement }
  | { type: 'select_cell_up'; payload: HTMLDivElement }
  | { type: 'reset_cell_select' }
  | { type: 'test_start' }
  | { type: 'select_cell_over'; payload: HTMLDivElement }
  | { type: 'start'; payload: StartOptionsType }
  | { type: 'gameover' };

export type SelectCellType = 'down' | 'up';

export type PointType = { x: number; y: number };

export type WritePointsType = {
  start: PointType;
  end: PointType;
};

export type BasicDirType = 'top' | 'left' | 'bottom' | 'right';

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

export type LinePropType = {
  angle: number;
  length: number;
};

export type WordsDataItemType = {
  name: string;
  lower: string;
  words?: string[];
  items?: WordsDataItemType[];
};

export type WordsDataType = WordsDataItemType[];

export type StartOptionsType = {
  words: string[];
  allWordsNormalCase: WordsNormalCaseType;
  sizeX: number;
  sizeY: number;
};

export type WordsNormalCaseType = { [key: string]: string };

export type GameAreaType = 'started' | 'gameover';
