import React, { useContext, useEffect } from 'react';
import GameContext from '../../context/Game/gameContext';
import { CellType } from '../../interfaces';

import './board.scss';
import CellList from '../CellList';

export const initBoard = () => {
  return createBoard();
};

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const createBoard = () => {
  const created_cells: CellType[] = [];

  Array.from(Array(3).keys()).forEach((rowId: number) => {
    Array.from(Array(3).keys()).forEach((colId: number) => {
      created_cells.push({
        id: rowId + '-' + colId,
        value: chars[rowId + colId],
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

const Board = () => {
  const [state, dispatch] = useContext(GameContext);

  console.log('state:', state);

  useEffect(() => {
    const handleMousedown = (e: MouseEvent) => {
      if ((e.target as HTMLDivElement)?.classList.contains('cell')) {
        dispatch({
          type: 'select_cell_down',
          payload: e.target as HTMLDivElement
        });
      } else {
        dispatch({ type: 'reset_cell_select' });
      }
    };

    const handleMouseup = (e: MouseEvent) => {
      if ((e.target as HTMLDivElement)?.classList.contains('cell')) {
        dispatch({
          type: 'select_cell_up',
          payload: e.target as HTMLDivElement
        });
      } else {
        dispatch({ type: 'reset_cell_select' });
      }
    };

    document.addEventListener('mousedown', handleMousedown);
    document.addEventListener('mouseup', handleMouseup);

    return () => {
      document.removeEventListener('mousedown', handleMousedown);
      document.removeEventListener('mouseup', handleMouseup);
    };
  }, [dispatch]);

  return (
    <>
      <div className="board">
        <div className="rows">
          <CellList cells={state.board.cells} />
        </div>
      </div>
    </>
  );
};

export default Board;
