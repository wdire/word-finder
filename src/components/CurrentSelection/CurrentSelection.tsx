import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../context/Game/gameContext';
import { PointType } from '../../interfaces';
import { isCellBetweenCorrectCross } from '../../utils/gameUtils';
import './current-selection.scss';

const CurrentSelection = () => {
  const [state, dispatch] = useContext(GameContext);

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

  const drawLine = (
    line: HTMLDivElement,
    container: HTMLDivElement,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    container.style.transform = 'rotate(' + angle + 'deg)';
    line.style.width = length + 'px';
    line.style.height = '2px';
    //TODO Note '20', half of cell's size, is constant for now, change it later
    if (angle > 0) {
      container.style.left = x1 + 20 + 0.5 + 'px';
      container.style.top = y1 + 20 + 0.5 + 'px';
    } else {
      container.style.left = x1 + 20 - 1.5 + 'px';
      container.style.top = y1 + 20 - 1.5 + 'px';
    }

    line.style.backgroundColor = 'black';
  };

  const resetLine = (line: HTMLDivElement, container: HTMLDivElement) => {
    line.style.width =
      line.style.height =
      container.style.left =
      container.style.top =
        0 + 'px';
  };

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
