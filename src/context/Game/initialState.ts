import { GameType } from '../../interfaces';

const initialState: GameType = {
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

export default initialState;
