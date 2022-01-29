import React from 'react';
import { GameActionType, GameType } from '../../interfaces';
import initialState from './initialState';

const GameContext = React.createContext<
  [GameType, React.Dispatch<GameActionType>]
>([
  initialState,
  // eslint-disable-next-line
  () => {}
]);

export default GameContext;
