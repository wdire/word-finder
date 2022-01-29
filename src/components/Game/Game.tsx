import React, { useContext } from 'react';
import './game.scss';
import Board from '../Board';
import { GameProvider } from '../../context/Game/GameProvider';
import WordList from '../WordList';
import FoundWordSelection from '../FoundSelection';
import StartPage from '../StartPage';
import GameContext from '../../context/Game/gameContext';
import GameArea from '../GameArea';

const Game = () => {
  return (
    <>
      <GameProvider>
        <GameArea onStarted={false}>
          <StartPage />
        </GameArea>
        <GameArea onStarted={true}>
          <Board />
          <WordList />
          <FoundWordSelection />
        </GameArea>
      </GameProvider>
    </>
  );
};

export default Game;
