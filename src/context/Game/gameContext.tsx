import React from 'react';
import { GameActionType, GameType } from '../../interfaces';
import { initialState } from './GameProvider';

const GameContext = React.createContext<
  [GameType, React.Dispatch<GameActionType>]
>([
  initialState,
  // eslint-disable-next-line
  () => {}
]);

export default GameContext;
