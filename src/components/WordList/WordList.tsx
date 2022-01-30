import { useCallback, useContext } from 'react';
import GameContext from '../../context/Game/gameContext';
import { WordsNormalCaseType } from '../../interfaces';
import './word-list.scss';

const WordList = () => {
  const [state] = useContext(GameContext);

  const renderWords = useCallback(
    (
      allWords: string[],
      allWordsNormalCase: WordsNormalCaseType,
      foundWords: string[]
    ) => {
      return allWords.map((word, index) => {
        const isFound = foundWords.includes(word);
        return (
          <div
            key={'word_' + index}
            className={'word-list_word' + (isFound ? ' found' : '')}
          >
            {allWordsNormalCase[word]}
          </div>
        );
      });
    },
    [state.allWords, state.foundWords]
  );

  return (
    <>
      <div className="word-list">
        {renderWords(
          state.allWords,
          state.allWordsNormalCase,
          state.foundWords
        )}
      </div>
    </>
  );
};

export default WordList;
