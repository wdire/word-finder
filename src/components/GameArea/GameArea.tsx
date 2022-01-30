import { useCallback, useContext } from 'react';
import GameContext from '../../context/Game/gameContext';
import { GameAreaType } from '../../interfaces';
import './game-area.scss';

type GameAreaProps = {
  children: React.ReactNode;
  on: GameAreaType;
  value: boolean;
};

const GameArea = ({ children, on, value }: GameAreaProps) => {
  const [state] = useContext(GameContext);

  const renderArea = () => {
    if (state[on] === value) {
      return children;
    } else {
      return <div></div>;
    }
  };

  return <>{renderArea()}</>;
};

export default GameArea;
