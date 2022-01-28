import { useCallback, useContext } from 'react';
import GameContext from '../../context/Game/gameContext';
import './word-list.scss';

const WordList = () => {
  const [state] = useContext(GameContext);

  const renderWords = useCallback(
    (allWords: string[], foundWords: string[]) => {
      return allWords.map((word, index) => {
        console.log('found words', foundWords);
        const isFound = foundWords.includes(word);
        return (
          <div
            key={'word_' + index}
            className={'word-list_word' + (isFound ? ' found' : '')}
          >
            {word}
          </div>
        );
      });
    },
    [state.allWords, state.foundWords]
  );

  return (
    <>
      <div className="word-list">
        {renderWords(state.allWords, state.foundWords)}
      </div>
    </>
  );
};

export default WordList;
