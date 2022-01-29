import { GameType } from '../../interfaces';

const initialState: GameType = {
  board: {
    cells: [],
    sizeX: 10,
    sizeY: 10
  },
  allWords: [],
  wordsLeft: [],
  started: false,
  foundWords: [],
  allWordsNormalCase: {},
  _states: {}
};

export default initialState;
