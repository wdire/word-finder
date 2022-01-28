import React from 'react';
import './game.scss';
import Board from '../Board';
import { GameProvider } from '../../context/Game/GameProvider';
import WordList from '../WordList';
import FoundWordSelection from '../FoundSelection';

const Game = () => {
  return (
    <>
      <GameProvider>
        <Board />
        <WordList />
        <FoundWordSelection />
      </GameProvider>
    </>
  );
};

export default Game;
