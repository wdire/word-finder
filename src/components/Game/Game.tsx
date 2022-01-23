import React from 'react';
import './game.scss';
import Board from '../Board';
import { GameProvider } from '../../context/Game/GameProvider';

const Game = () => {
  return (
    <>
      <GameProvider>
        <Board />
      </GameProvider>
    </>
  );
};

export default Game;
