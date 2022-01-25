import React, { useReducer } from 'react';
import { GameType } from '../../interfaces';
import GameContext from './gameContext';
import gameReducer from './gameReducer';

export const GameProvider = (props: { children: React.ReactNode }) => {
  const initialState: GameType = {
    board: {
      cells: []
    },
    _states: {}
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {props.children}
    </GameContext.Provider>
  );
};
