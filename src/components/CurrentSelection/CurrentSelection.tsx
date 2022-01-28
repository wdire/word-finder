import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../context/Game/gameContext';
import { PointType } from '../../interfaces';
import { isCellBetweenCorrectCross } from '../../utils/gameUtils';
import { drawLine, resetLine } from '../../utils/selectionsUtils';
import './current-selection.scss';

const CurrentSelection = () => {
  const [state] = useContext(GameContext);

  const currentSelectionRef = useRef<HTMLDivElement>(null);
  const currentSelectionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentSelectionRef.current && currentSelectionContainerRef.current) {
      if (
        state._states.cell_selected_down &&
        state._states.cell_selected_over
      ) {
        const selected_down = state._states.cell_selected_down.ref.current;
        const selected_over = state._states.cell_selected_over.ref.current;

        const selected_down_point: PointType = {
          x: selected_down?.offsetLeft || 0,
          y: selected_down?.offsetTop || 0
        };

        const selected_over_point: PointType = {
          x: selected_over?.offsetLeft || 0,
          y: selected_over?.offsetTop || 0
        };

        if (
          selected_down_point.x === selected_over_point.x &&
          selected_down_point.y === selected_over_point.y
        ) {
          resetLine(
            currentSelectionRef.current,
            currentSelectionContainerRef.current
          );
          return;
        }

        if (
          isCellBetweenCorrectCross(selected_down_point, selected_over_point)
        ) {
          drawLine(
            currentSelectionRef.current,
            currentSelectionContainerRef.current,
            selected_down_point.x,
            selected_down_point.y,
            selected_over_point.x,
            selected_over_point.y
          );
        }
      } else {
        resetLine(
          currentSelectionRef.current,
          currentSelectionContainerRef.current
        );
      }
    }
  }, [state._states.cell_selected_down, state._states.cell_selected_over]);

  return (
    <>
      <div
        className="current_selection-container"
        ref={currentSelectionContainerRef}
      >
        <div className="current_selection" ref={currentSelectionRef}></div>
      </div>
    </>
  );
};

export default CurrentSelection;
