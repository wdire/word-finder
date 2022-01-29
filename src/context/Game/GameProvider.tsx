import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
import initialState from './initialState';

export const GameProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {props.children}
    </GameContext.Provider>
  );
};
