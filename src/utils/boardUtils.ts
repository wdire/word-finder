import React from 'react';
import {
  CellType,
  BoardType,
  WritePointsType,
  BasicDirType,
  PointType,
  AvailabilityCalcType
} from '../interfaces/interfaces';
import { findCellsBetweenSelection } from './gameUtils';

export const initBoard = (sizeX: number, sizeY: number, words: string[]) => {
  return createBoardWithWords(sizeX, sizeY, words);
};

const createBoard = (sizeX: number, sizeY: number): BoardType => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const created_cells: CellType[] = [];

  Array.from(Array(sizeY).keys()).forEach((rowId: number) => {
    Array.from(Array(sizeX).keys()).forEach((colId: number) => {
      created_cells.push({
        id: rowId + '-' + colId,
        value: chars[Math.floor(Math.random() * (chars.length - 1))],
        point: {
          y: rowId,
          x: colId
        },
        available: true,
        ref: React.createRef()
      });
    });
  });

  return {
    cells: created_cells,
    sizeX,
    sizeY
  };
};

export const createBoardWithWords = (
  sizeX: number,
  sizeY: number,
  words: string[]
): BoardType => {
  const board = createBoard(sizeX, sizeY);

  words.forEach((word) => {
    const availablePoint = checkAllAvailablePlaces(
      board.cells,
      word,
      sizeX,
      sizeY
    );

    if (availablePoint) {
      writeWordPointToPoint(board.cells, availablePoint, word);
    }
  });

  return board;
};

const writeWordPointToPoint = (
  cells: CellType[],
  points: WritePointsType,
  word: string
) => {
  const wordSplit = word.split('');
  let wordCount = 0;

  const cells_between_start_end = findCellsBetweenSelection(
    cells,
    points.start,
    points.end
  );

  if (!cells_between_start_end) {
    console.log('error 95132');
    return cells;
  }

  cells_between_start_end.forEach((cell_between) => {
    cell_between.value = wordSplit[wordCount];
    cell_between.available = false;
    if (cell_between.style?.background) {
      //cell_between.style = { background: 'rgba(50,50,50,0.4)' };
    } else {
      //cell_between.style = { background: 'rgba(50,50,50,0.2)' };
    }
    wordCount++;
  });
};

const availabilityCalculation = (
  start_point: PointType,
  word: string,
  sizeX: number,
  sizeY: number
): AvailabilityCalcType => {
  return {
    top: {
      available: start_point.y - word.length + 1 >= 0,
      end_point: { x: start_point.x, y: start_point.y - word.length + 1 }
    },
    left: {
      available: start_point.x - word.length + 1 >= 0,
      end_point: { x: start_point.x - word.length + 1, y: start_point.y }
    },
    bottom: {
      available: start_point.y + word.length <= sizeY,
      end_point: { x: start_point.x, y: start_point.y + word.length - 1 }
    },
    right: {
      available: start_point.x + word.length <= sizeX,
      end_point: { x: start_point.x + word.length - 1, y: start_point.y }
    }
  };
};

const calculateAvailableEndPoints = (
  start_point: PointType,
  word: string,
  sizeX: number,
  sizeY: number
): PointType[] => {
  const availableEndPoints: PointType[] = [];

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

    const availableCalc = availabilityCalculation(
      start_point,
      word,
      sizeX,
      sizeY
    );

    if (availableCalc[basicDir]) {
      // top, bottom, left, right
      if (availableCalc[basicDir].available) {
        availableEndPoints.push(availableCalc[basicDir].end_point);
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
      }
    }
  });

  return availableEndPoints;
};

const checkAllAvailablePlaces = (
  cells: CellType[],
  word: string,
  sizeX: number,
  sizeY: number
): WritePointsType => {
  const allAvailableEndPoints: WritePointsType[] = [];
  const wordSplit = word.split('');

  cells.forEach((cell) => {
    const avalilableEndPoints = calculateAvailableEndPoints(
      cell.point,
      word,
      sizeX,
      sizeY
    );

    const notCollidingAvailableEndPoints = avalilableEndPoints.filter(
      (avalPoint) => {
        let notCollided = true;
        let letterCount = 0;
        let overlappedLetters = 0;

        const cells_between = findCellsBetweenSelection(
          cells,
          cell.point,
          avalPoint
        );

        if (cells_between) {
          cells_between.forEach((cell_between) => {
            if (
              wordSplit[letterCount].includes(cell_between.value) &&
              cell_between.available === false &&
              overlappedLetters < 2
            ) {
              overlappedLetters++;
            } else if (cell_between.available === false) {
              //remove
              notCollided = false;
            }

            letterCount++;
          });
        }

        return notCollided;
      }
    );

    notCollidingAvailableEndPoints.forEach((notCollidingPoint) => {
      allAvailableEndPoints.push({
        start: cell.point,
        end: notCollidingPoint
      });
    });
  });

  //checkExpandabilityFromAnotherWord(cells, word, sizeX, sizeY);

  return allAvailableEndPoints[
    Math.floor(Math.random() * allAvailableEndPoints.length)
  ];
};

export const getRowsCount = (cells: CellType[]) => {
  return cells[cells.length - 1].point.y + 1;
};

export const getColumnsCount = (cells: CellType[]) => {
  return cells[cells.length - 1].point.x + 1;
};

export const getRow = (cells: CellType[], row: number) => {
  return cells.filter((cell) => cell.point.y === row);
};

export const getCellById = (cells: CellType[], id: string): CellType => {
  return cells.filter((cell) => cell.id === id)[0];
};
