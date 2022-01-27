import {
  CellsBetweenSelectionType,
  CellType,
  GameState,
  PointType,
  SelectCellType
} from '../interfaces';
import { getCellById } from './boardUtils';

export const selectCell = (
  cells: CellType[],
  elm: HTMLDivElement,
  type: SelectCellType
): CellType => {
  const cell = getCellById(cells, elm.getAttribute('data-cell-id') || '');

  if (type === 'up') {
    cell.ref.current?.classList.add('selected');
  } else if (type === 'down') {
    cell.ref.current?.classList.add('selected');
  }

  return cell;
};

export const getCellByElm = (cells: CellType[], elm: HTMLDivElement) => {
  return getCellById(cells, elm.getAttribute('data-cell-id') || '');
};

export const resetSelectCell = (cells: CellType[]) => {
  cells.forEach((cell) => {
    cell.ref.current?.classList.remove('selected');
  });
};

export const resetCurrentSelectedCells = (_states: GameState) => {
  const reset_cells: CellType[] = [];

  if (_states.cell_selected_down) {
    reset_cells.push(_states.cell_selected_down);
  }

  if (_states.cell_selected_up) {
    reset_cells.push(_states.cell_selected_up);
  }

  resetSelectCell(reset_cells);
};

const isNotCorrectCross = (plots: PointType[]) => {
  let notVertical = false;
  let notHorizontal = false;
  let notCorrectCross = false;

  for (let i = 0; plots.length > i; i++) {
    // not horizontal
    if (plots[i + 1] && Math.abs(plots[i].x - plots[i + 1].x) > 0) {
      notHorizontal = true;
    }

    // not vertical
    if (plots[i + 1] && Math.abs(plots[i].y - plots[i + 1].y) > 0) {
      notVertical = true;
    }

    if (notHorizontal && plots[i + 1] && plots[i].x === plots[i + 1].x) {
      notCorrectCross = true;
    }

    if (notVertical && plots[i + 1] && plots[i].y === plots[i + 1].y) {
      notCorrectCross = true;
    }
  }

  return notCorrectCross;
};

export const findCellsBetweenSelection = (
  cells: CellType[],
  start_point: PointType,
  end_point: PointType
): CellsBetweenSelectionType => {
  const plots = plotBresenham(
    start_point.x,
    start_point.y,
    end_point.x,
    end_point.y
  );
  const cells_between: CellType[] = [];

  //TODO: note, can delete not correct cross later probably
  if (!isNotCorrectCross(plots)) {
    plots.forEach((plot) => {
      cells_between.push(getCellById(cells, plot.y + '-' + plot.x));
    });
    return cells_between;
  } else {
    console.log('error 654891');
    return false;
  }
};

export const combineCellValues = (cells: CellType[]) => {
  let word = '';
  cells.forEach((cell) => {
    word += cell.value;
  });

  return word;
};

//https://www.vertexfragment.com/ramblings/variable-length-bresenham-lines/
export const plotBresenham = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  range = 0
): PointType[] => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  const dirX = dx > 0 ? 1 : -1;
  const dirY = dy > 0 ? 1 : -1;

  if (absX > absY) {
    return plotBresenhamHorizontal(
      x0,
      y0,
      absX,
      absY,
      dirX,
      dirY,
      range <= 0 ? absX : range
    );
  } else {
    return plotBresenhamVertical(
      x0,
      y0,
      absX,
      absY,
      dirX,
      dirY,
      range <= 0 ? absY : range
    );
  }
};

const plotBresenhamHorizontal = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  xdir: number,
  ydir: number,
  range: number
) => {
  const dx2 = dx * 2;
  const dy2 = dy * 2;
  let err = dy2 - dx;
  const plots = [];

  plots.push({ x, y });

  while (range--) {
    if (err >= 0) {
      y += ydir;
      err -= dx2;
    }

    err += dy2;
    x += xdir;

    plots.push({ x, y });
  }

  return plots;
};

const plotBresenhamVertical = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  xdir: number,
  ydir: number,
  range: number
) => {
  const dx2 = dx * 2;
  const dy2 = dy * 2;
  let err = dx2 - dy;
  const plots = [];

  plots.push({ x, y });

  while (range--) {
    if (err >= 0) {
      x += xdir;
      err -= dy2;
    }

    err += dx2;
    y += ydir;

    plots.push({ x, y });
  }

  return plots;
};
