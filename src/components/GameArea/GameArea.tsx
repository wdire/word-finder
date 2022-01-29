import { useCallback, useContext } from 'react';
import GameContext from '../../context/Game/gameContext';
import './game-area.scss';

type GameAreaProps = {
  children: React.ReactNode;
  onStarted: boolean;
};

const GameArea = ({ children, onStarted }: GameAreaProps) => {
  const [state] = useContext(GameContext);

  const renderArea = () => {
    if (state.started === onStarted) {
      return children;
    } else {
      return <div></div>;
    }
  };

  return <>{renderArea()}</>;
};

export default GameArea;
