import { useContext } from 'react';
import GameContext from '../../context/Game/gameContext';
import './gameover.scss';

const Gameover = () => {
  const [state, dispatch] = useContext(GameContext);

  const handleReplayButtonClick = () => {
    dispatch({ type: 'gameover' });
  };

  return (
    <>
      <div className="gameover">
        <h3>Congrats Mate!</h3>
        <button className="replay_button" onClick={handleReplayButtonClick}>
          Another Round ?
        </button>
      </div>
    </>
  );
};

export default Gameover;
