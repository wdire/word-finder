import React, { useReducer } from 'react';
import { GameType } from '../../interfaces';
import GameContext from './gameContext';
import gameReducer from './gameReducer';

export const initialState: GameType = {
  board: {
    cells: [],
    sizeX: 15,
    sizeY: 10
  },
  words: [
    'STRIDE',
    'UNDERTAKE',
    'EMPIRICAL',
    'EXTENSION',
    'JOYSTICK',
    'CLUSTER',
    'RAID',
    'TERRACE',
    'PROTEST',
    'PREY'
  ],
  _states: {}
};

export const GameProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {props.children}
    </GameContext.Provider>
  );
};
