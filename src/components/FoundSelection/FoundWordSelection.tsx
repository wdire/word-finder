import { useCallback, useContext } from 'react';
import GameContext from '../../context/Game/gameContext';
import { calculateLineStyle } from '../../utils/selectionsUtils';
import './found-word-selection.scss';

const FoundWordSelection = () => {
  const [state] = useContext(GameContext);

  const renderSelections = useCallback(() => {
    const selections = state.board.selections || [];

    return selections.map((selection, index) => {
      const start = selection.cells[0].ref.current;
      const end = selection.cells[selection.cells.length - 1].ref.current;

      if (start && end) {
        const lineStyle = calculateLineStyle(
          start?.offsetLeft,
          start?.offsetTop,
          end?.offsetLeft,
          end?.offsetTop
        );

        return (
          <div
            key={'selc_' + index}
            className="found-word-selection_container"
            style={{
              top: lineStyle.top,
              left: lineStyle.left,
              transform: lineStyle.transform
            }}
          >
            <div
              className="found-word-selection"
              style={{
                width: lineStyle.width,
                height: lineStyle.height,
                background: '#000'
              }}
            ></div>
          </div>
        );
      }
    });
  }, [state.board.selections]);

  return (
    <>
      <div className="found-word-selections">{renderSelections()}</div>
    </>
  );
};

export default FoundWordSelection;
