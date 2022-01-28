import { LinePropType } from '../interfaces';

export const drawLine = (
  line: HTMLDivElement,
  container: HTMLDivElement,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const lineStyle = calculateLineStyle(x1, y1, x2, y2);

  container.style.transform = lineStyle.transform;
  container.style.left = lineStyle.left;
  container.style.top = lineStyle.top;
  line.style.backgroundColor = 'black';
  line.style.width = lineStyle.width;
  line.style.height = lineStyle.height;
};

export const calculateLineStyle = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const { angle, length } = calculateLineProps(x1, y1, x2, y2);
  const output = {
    transform: 'rotate(' + angle + 'deg)',
    width: length + 'px',
    height: '2px',
    left: x1 + 19 + 0.5 + 'px',
    top: y1 + 19 + 0.5 + 'px'
  };

  if (angle < 0) {
    output.left = x1 + 19 - 0.5 + 'px';
    output.top = y1 + 19 - 0.5 + 'px';
  }

  return output;
};

const calculateLineProps = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): LinePropType => {
  const length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  return {
    angle,
    length
  };
};

export const resetLine = (line: HTMLDivElement, container: HTMLDivElement) => {
  line.style.width = 0 + 'px';
};
