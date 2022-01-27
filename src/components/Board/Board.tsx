import React, { useContext, useEffect } from 'react';
import GameContext from '../../context/Game/gameContext';

import './board.scss';
import CellList from '../CellList';

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
        if (state._states.cell_selected_down) {
          dispatch({ type: 'reset_cell_select' });
        }
      }
    };

    const handleMouseup = (e: MouseEvent) => {
      if ((e.target as HTMLDivElement)?.classList.contains('cell')) {
        dispatch({
          type: 'select_cell_up',
          payload: e.target as HTMLDivElement
        });
      } else {
        if (state._states.cell_selected_down) {
          dispatch({ type: 'reset_cell_select' });
        }
      }
    };

    document.addEventListener('mousedown', handleMousedown);
    document.addEventListener('mouseup', handleMouseup);

    dispatch({ type: 'test_start' });

    return () => {
      document.removeEventListener('mousedown', handleMousedown);
      document.removeEventListener('mouseup', handleMouseup);
    };
  }, []);

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
