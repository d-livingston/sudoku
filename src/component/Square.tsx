import * as React from "react";
import * as PropTypes from "prop-types";
import Cell from "./Cell";
import "./square.css";

export type SquareProps = {
    cells: Array<{ cell: number; value: number }>;
    selectCell: (cell: number) => void;
};

const propTypes = {
    cells: PropTypes.arrayOf(
        PropTypes.exact({
            cell: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
};

const Square: React.FC<SquareProps> = ({ cells, selectCell }) => {
    return (
        <div className="sudoku__square">
            {cells.map(({ cell, value }) => (
                <Cell
                    key={`cell-${cell}`}
                    value={value}
                    onClick={() => selectCell(cell)}
                />
            ))}
        </div>
    );
};

Square.propTypes = propTypes;

export default Square;
