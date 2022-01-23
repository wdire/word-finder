import { CellType } from '../../interfaces';
import { getRow, getRowsCount } from '../../utils/boardUtils';
import Cell from '../Cell';

import './cell-list.scss';

const CellList = ({ cells }: { cells: CellType[] }) => {
  return cells.length > 0 ? (
    <>
      {Array.from(Array(getRowsCount(cells)).keys()).map((row) => {
        return (
          <div key={'row_' + row} className="row">
            {getRow(cells, row).map((cell) => (
              <Cell key={'cell_' + cell.id} cell_data={cell} />
            ))}
          </div>
        );
      })}
    </>
  ) : (
    <div></div>
  );
};

export default CellList;
