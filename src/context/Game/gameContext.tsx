import React from 'react';
import { GameActionType, GameType } from '../../interfaces';

const GameContext = React.createContext<
  [GameType, React.Dispatch<GameActionType>]
>([
  {
    board: {
      cells: []
    },
    _states: {}
  },
  // eslint-disable-next-line
  () => {}
]);

export default GameContext;
