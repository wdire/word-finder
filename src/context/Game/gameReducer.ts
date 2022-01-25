import { GameActionType, GameType } from '../../interfaces';
import { initBoard } from '../../utils/boardUtils';
import {
  combineCellValues,
  findCellsBetweenSelection,
  getCellByElm,
  resetCurrentSelectedCells
} from '../../utils/gameUtils';

const gameReducer = (state: GameType, action: GameActionType): GameType => {
  console.log('action', action);
  switch (action.type) {
    case 'select_cell_down': {
      const cell_selected_down = getCellByElm(
        state.board.cells,
        action.payload
      );

      return {
        ...state,
        _states: {
          ...state._states,
          cell_selected_down
        }
      };
    }

    case 'select_cell_up': {
      if (!state._states.cell_selected_down) return { ...state };

      const cell_selected_up = getCellByElm(state.board.cells, action.payload);

      const cells_between = findCellsBetweenSelection(
        state.board.cells,
        state._states.cell_selected_down,
        cell_selected_up
      );

      if (typeof cells_between === 'object' && cells_between?.length > 0) {
        const cells_word = combineCellValues(cells_between);

        return {
          ...state,
          _states: {
            ...state._states,
            cell_selected_down: undefined,
            selections: [
              ...(state._states.selections || []),
              {
                cells: cells_between,
                word: cells_word
              }
            ]
          }
        };
      }

      return {
        ...state,
        _states: {
          ...state._states
        }
      };
    }

    case 'reset_cell_select': {
      resetCurrentSelectedCells(state._states);

      if (state._states.cell_selected_down)
        delete state._states.cell_selected_down;

      return {
        ...state
      };
    }

    case 'test_start': {
      return {
        ...state,
        board: initBoard()
      };
    }

    default: {
      console.log('!!default');
      return {
        ...state
      };
    }
  }
};

export default gameReducer;
