import './game.scss';
import Board from '../Board';
import { GameProvider } from '../../context/Game/GameProvider';
import WordList from '../WordList';
import FoundWordSelection from '../FoundSelection';
import StartPage from '../StartPage';
import GameArea from '../GameArea';
import Header from '../Header';
import Gameover from '../Gameover';

const Game = () => {
  return (
    <>
      <GameProvider>
        <GameArea on="started" value={false}>
          <StartPage />
        </GameArea>
        <GameArea on="started" value={true}>
          <Header />
          <Board />
          <WordList />
          <FoundWordSelection />
        </GameArea>
        <GameArea on="gameover" value={true}>
          <Gameover />
        </GameArea>
      </GameProvider>
    </>
  );
};

export default Game;
