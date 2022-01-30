import { GameActionType, GameType } from '../../interfaces';
import { initBoard } from '../../utils/boardUtils';
import {
  getCellByElm,
  handleEndOfSelectionWord,
  isGameOver
} from '../../utils/gameUtils';
import initialState from './initialState';

const gameReducer = (state: GameType, action: GameActionType): GameType => {
  //console.log('action', action);
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

      const output = {
        ...state,
        _states: {
          ...state._states,
          cell_selected_down: undefined,
          cell_selected_over: undefined
        }
      };

      const cell_selected_up = getCellByElm(state.board.cells, action.payload);

      const selection = handleEndOfSelectionWord(
        state.board.cells,
        state._states.cell_selected_down.point,
        cell_selected_up.point,
        state.wordsLeft
      );

      if (selection.length > 0) {
        output.board.selections = [
          ...(state.board.selections || []),
          ...selection
        ];

        output.wordsLeft.splice(state.wordsLeft.indexOf(selection[0].word), 1);
        output.foundWords.push(selection[0].word);
      }

      if (isGameOver(state.allWords, state.foundWords)) {
        output.gameover = true;
      }

      return output;
    }

    case 'select_cell_over': {
      const cell_selected_over = getCellByElm(
        state.board.cells,
        action.payload
      );

      return {
        ...state,
        _states: {
          ...state._states,
          cell_selected_over
        }
      };
    }

    case 'reset_cell_select': {
      return {
        ...state,
        _states: {
          ...state._states,
          cell_selected_down: undefined,
          cell_selected_over: undefined
        }
      };
    }

    case 'test_start': {
      return {
        ...state,
        board: initBoard(state.board.sizeX, state.board.sizeY, state.allWords)
      };
    }

    case 'start': {
      const allWords = [...action.payload.words];

      return {
        ...state,
        started: true,
        gameover: false,
        board: initBoard(action.payload.sizeX, action.payload.sizeY, allWords),
        wordsLeft: [...allWords],
        allWords: [...allWords],
        foundWords: [],
        allWordsNormalCase: action.payload.allWordsNormalCase
      };
    }

    case 'gameover': {
      return {
        board: {
          cells: [],
          sizeX: 0,
          sizeY: 0
        },
        allWords: [],
        wordsLeft: [],
        started: false,
        gameover: false,
        foundWords: [],
        allWordsNormalCase: {},
        _states: {}
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
