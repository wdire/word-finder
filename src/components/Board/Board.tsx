import React, { useContext, useEffect, useRef } from 'react';
import GameContext from '../../context/Game/gameContext';

import './board.scss';
import CellList from '../CellList';
import CurrentSelection from '../CurrentSelection';

const Board = () => {
  const [state, dispatch] = useContext(GameContext);

  const _states = useRef(state._states);
  _states.current = state._states;

  useEffect(() => {
    const handleMousedown = (e: MouseEvent) => {
      if ((e.target as HTMLDivElement)?.classList.contains('cell')) {
        dispatch({
          type: 'select_cell_down',
          payload: e.target as HTMLDivElement
        });
      } else {
        if (_states.current?.cell_selected_down) {
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
        if (_states.current?.cell_selected_down) {
          dispatch({ type: 'reset_cell_select' });
        }
      }
    };

    const handleMousemove = (e: MouseEvent) => {
      if (
        _states.current?.cell_selected_down &&
        (e.target as HTMLDivElement)?.classList.contains('cell') &&
        _states.current?.cell_selected_over?.ref.current?.getAttribute(
          'data-cell-id'
        ) !== (e.target as HTMLDivElement).getAttribute('data-cell-id')
      ) {
        dispatch({
          type: 'select_cell_over',
          payload: e.target as HTMLDivElement
        });
      }
    };

    document.addEventListener('mousedown', handleMousedown);
    document.addEventListener('mousemove', handleMousemove);
    document.addEventListener('mouseup', handleMouseup);

    return () => {
      document.removeEventListener('mousedown', handleMousedown);
      document.removeEventListener('mousemove', handleMousemove);
      document.removeEventListener('mouseup', handleMouseup);
    };
  }, []);

  return (
    <>
      <div className="board">
        <div className="rows">
          <CellList cells={state.board.cells} />
        </div>

        <CurrentSelection />
      </div>
    </>
  );
};

export default Board;
