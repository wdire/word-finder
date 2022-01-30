import React, { useCallback, useContext, useState } from 'react';
import GameContext from '../../context/Game/gameContext';
import { allWordsData } from '../../data/words';
import { WordsNormalCaseType } from '../../interfaces';
import './start-page.scss';

const StartPage = () => {
  const [state, dispatch] = useContext(GameContext);
  const [gameType, setGameType] = useState('starwars');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGameType(e.target.value);
  };

  const renderOptions = useCallback(() => {
    return allWordsData.map((words_data, main_index) => {
      if (words_data?.words) {
        return (
          <option key={main_index} value={words_data.lower}>
            {words_data.name}
          </option>
        );
      } else if (words_data?.items) {
        return (
          <optgroup key={main_index} label={words_data.name}>
            {words_data.items.map((words_data_item, item_index) => {
              if (words_data_item.words) {
                return (
                  <option key={item_index} value={words_data_item.lower}>
                    {words_data_item.name}
                  </option>
                );
              }
            })}
          </optgroup>
        );
      }
    });
  }, [allWordsData]);

  const handleStartClick = () => {
    let words: string[] = [];

    allWordsData.forEach((words_data) => {
      if (words_data?.words && words_data.lower === gameType) {
        words = words_data.words;
      } else if (words_data?.items) {
        words_data?.items.forEach((words_data_item) => {
          if (words_data_item?.words && words_data_item.lower === gameType) {
            words = words_data_item.words;
          }
        });
      }
    });

    if (words.length > 0) {
      words = words.sort(() => Math.random() - 0.5).slice(0, 8);

      const caseChangedWords: WordsNormalCaseType = {};

      words.forEach((e) => {
        caseChangedWords[e.replaceAll(' ', '').toUpperCase()] = e;
      });

      words = words.map((e) => e.replaceAll(' ', '').toUpperCase());

      const longestWord = words.reduce((a, b) => {
        return a.length > b.length ? a : b;
      });

      const sizeX = longestWord.length + Math.floor(Math.random() * 3) + 1;
      const sizeY = sizeX + Math.floor(Math.random() * 3) - 1;

      dispatch({
        type: 'start',
        payload: {
          words: words,
          sizeX,
          sizeY,
          allWordsNormalCase: caseChangedWords
        }
      });
    }
  };

  return (
    <>
      <div className="start-page">
        <h2>Word Finder</h2>
        <div className="start-page_title">Game type</div>
        <select
          className="start-page_options"
          onChange={handleOptionChange}
          value={gameType}
        >
          {renderOptions()}
          <option value="_create">Create Yours(soon)</option>
        </select>

        <button className="start-page_button" onClick={handleStartClick}>
          START
        </button>
      </div>
    </>
  );
};

export default StartPage;
