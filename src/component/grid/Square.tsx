import * as React from "react";
import * as PropTypes from "prop-types";
import Cell from "./Cell";
import { getColumn, getRow, getValue } from "../../utils";
import type { State } from "../reducer";
import "./square.css";

export type SquareProps = {
    id: number;
    cells: Array<{ cell: number; value: number }>;
    selectCell: (cell: number) => void;
    state: State;
};

const propTypes = {
    id: PropTypes.number.isRequired,
    cells: PropTypes.arrayOf(
        PropTypes.exact({
            cell: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
    selectCell: PropTypes.func.isRequired,
};

const Square: React.FC<SquareProps> = ({ id, cells, selectCell, state }) => {
    return (
        <div className="sudoku__square">
            {cells.map(({ cell, value }) => {
                const size = state.initial.length;
                const isInSameHouse =
                    getRow(size, cell) === state.selected.row ||
                    getColumn(size, cell) === state.selected.column ||
                    id === state.selected.square;
                return (
                    <Cell
                        key={`cell-${cell}`}
                        value={value}
                        onClick={() => selectCell(cell)}
                        isSelected={cell === state.selected.cell}
                        isLocked={getValue(state.initial, cell) !== 0}
                        isInSameHouse={isInSameHouse}
                        hasSameValue={
                            value !== 0 && value === state.selected.value
                        }
                        notes={state.notes.get(cell)}
                    />
                );
            })}
        </div>
    );
};

Square.propTypes = propTypes;

export default Square;
