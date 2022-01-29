import { useCallback, useContext } from 'react';
import GameContext from '../../context/Game/gameContext';
import { WordsNormalCaseType } from '../../interfaces';
import './word-list.scss';

const WordList = () => {
  const [state] = useContext(GameContext);

  const renderWords = useCallback(
    (allWords: WordsNormalCaseType, foundWords: string[]) => {
      return Object.entries(allWords).map((word, index) => {
        const isFound = foundWords.includes(word[0]);
        return (
          <div
            key={'word_' + index}
            className={'word-list_word' + (isFound ? ' found' : '')}
          >
            {word[1]}
          </div>
        );
      });
    },
    [state.allWordsNormalCase, state.foundWords]
  );

  return (
    <>
      <div className="word-list">
        {renderWords(state.allWordsNormalCase, state.foundWords)}
      </div>
    </>
  );
};

export default WordList;
