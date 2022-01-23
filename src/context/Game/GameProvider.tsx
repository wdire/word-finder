import React, { useReducer } from 'react';
import { initBoard } from '../../components/Board/Board';
import { GameType } from '../../interfaces';
import GameContext from './gameContext';
import gameReducer from './gameReducer';

export const GameProvider = (props: { children: React.ReactNode }) => {
  const initialState: GameType = {
    board: initBoard(),
    _states: {}
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {props.children}
    </GameContext.Provider>
  );
};
