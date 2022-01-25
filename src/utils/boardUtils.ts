import React from 'react';
import {
  CellType,
  BoardType,
  WritePointsType,
  BasicDirType,
  PointType
} from '../interfaces/interfaces';
import { findCellsBetweenSelection } from './gameUtils';

const words = ['YESS'];

export const initBoard = () => {
  return createBoardWithWords(4, 4, words);
};

const createBoard = (sizeX: number, sizeY: number): BoardType => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const created_cells: CellType[] = [];

  Array.from(Array(sizeX).keys()).forEach((rowId: number) => {
    Array.from(Array(sizeY).keys()).forEach((colId: number) => {
      created_cells.push({
        id: rowId + '-' + colId,
        value: chars[Math.floor(Math.random() * (chars.length - 1))],
        y: rowId,
        x: colId,
        ref: React.createRef()
      });
    });
  });

  return {
    cells: created_cells
  };
};

export const createBoardWithWords = (
  sizeX: number,
  sizeY: number,
  words: string[]
): BoardType => {
  const board = createBoard(sizeX, sizeY);

  words.forEach((word) => {
    const availablePoint = findAvailablePoints(sizeX, sizeY, word);

    if (
      availablePoint &&
      availablePoint.end.x !== -1 &&
      availablePoint.end.y !== -1
    ) {
      writeWordPointToPoint(board.cells, availablePoint, word);
    } else {
      console.log('error 658454');
    }
  });

  return board;
};

const writeWordPointToPoint = (
  cells: CellType[],
  points: WritePointsType,
  word: string
): CellType[] => {
  console.log('<---------------');
  console.log('#writeWordPointToPoint');

  const start_cell = getCellById(cells, points.start.y + '-' + points.start.x);
  const end_cell = getCellById(cells, points.end.y + '-' + points.end.x);
  const wordSplit = word.split('');
  let wordCount = 0;

  const cells_between_start_end = findCellsBetweenSelection(
    cells,
    start_cell,
    end_cell
  );

  if (!cells_between_start_end) {
    console.log('error 95132');
    return cells;
  }

  console.log('--------------->');

  return cells.map((cell) => {
    const isBetweenCell = cells_between_start_end.filter(
      (b_cell) => b_cell.id === cell.id
    );

    if (isBetweenCell.length > 0) {
      cell.value = wordSplit[wordCount];
      wordCount++;
    }

    return cell;
  });
};

const findAvailablePoints = (
  sizeX: number,
  sizeY: number,
  word: string
): WritePointsType => {
  let start_point: PointType = {
    x: 0,
    y: 0
  };
  let availableEndPoints: PointType[] = [];
  const maxWhile = 20;
  let countWhile = 0;

  console.log('<---------------');
  console.log('#findAvailablePoints');

  while (availableEndPoints.length <= 0 && countWhile < maxWhile) {
    console.log('-trying point');

    countWhile++;

    start_point = {
      x: Math.floor(Math.random() * sizeX),
      y: Math.floor(Math.random() * sizeY)
    };

    availableEndPoints = calculateAvailableEndPoints(
      start_point,
      word,
      sizeX,
      sizeY
    );
  }

  if (availableEndPoints.length === 0) {
    console.log('no available spot found for word: ' + word);
    return {
      start: start_point,
      end: { x: -1, y: -1 }
    };
  }

  const end_point =
    availableEndPoints[Math.floor(Math.random() * availableEndPoints.length)];

  console.log('start_point', start_point);
  console.log('end_point', end_point);

  console.log('--------------->');

  return {
    start: start_point,
    end: end_point
  };
};

const calculateAvailableEndPoints = (
  start_point: PointType,
  word: string,
  sizeX: number,
  sizeY: number
): PointType[] => {
  const availableEndPoints: PointType[] = [];

  const availableCalc = {
    top: {
      available: start_point.y - word.length + 1 >= 0,
      end_point: { x: start_point.x, y: start_point.y - word.length + 1 }
    },
    left: {
      available: start_point.x - word.length + 1 >= 0,
      end_point: { x: start_point.x - word.length + 1, y: start_point.y }
    },
    bottom: {
      available: start_point.y + word.length - 1 <= sizeY - 1,
      end_point: { x: start_point.x, y: start_point.y + word.length - 1 }
    },
    right: {
      available: start_point.x + word.length - 1 <= sizeX - 1,
      end_point: { x: start_point.x + word.length - 1, y: start_point.y }
    }
  };

  const availableDirections = [
    'top',
    'left',
    'bottom',
    'right',
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left'
  ];

  availableDirections.forEach((avalDir: string) => {
    const basicDir = avalDir as BasicDirType;

    if (availableCalc[basicDir]) {
      // top, bottom, left, right
      if (availableCalc[basicDir].available) {
        availableEndPoints.push(availableCalc[basicDir].end_point);
        console.log('available to ' + basicDir);
      }
    } else if (avalDir.split('-').length === 2) {
      // [0] -> top | bottom, [1] -> left | right
      const crossDirs = avalDir.split('-') as BasicDirType[];

      if (
        availableCalc[crossDirs[0]].available &&
        availableCalc[crossDirs[1]].available
      ) {
        availableEndPoints.push({
          x: availableCalc[crossDirs[1]].end_point.x,
          y: availableCalc[crossDirs[0]].end_point.y
        });
        console.log(`available to ${crossDirs[0]}-${crossDirs[1]}`);
      }
    }
  });

  return availableEndPoints;
};

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
