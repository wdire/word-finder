import { CellType } from '../../interfaces';

import './cell.scss';

const Cell = ({ cell_data }: { cell_data: CellType }) => {
  return (
    <>
      <div className="cell" ref={cell_data.ref} data-cell-id={cell_data.id}>
        {cell_data.value}
      </div>
    </>
  );
};

export default Cell;
