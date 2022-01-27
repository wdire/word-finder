import { CellType } from '../../interfaces';

import './cell.scss';

const Cell = ({ cell_data }: { cell_data: CellType }) => {
  return (
    <>
      <div
        className={
          'cell' + (cell_data.class_name ? ' ' + cell_data.class_name : '')
        }
        ref={cell_data.ref}
        data-cell-id={cell_data.id}
        style={cell_data.style}
      >
        {cell_data.value}
      </div>
    </>
  );
};

export default Cell;
