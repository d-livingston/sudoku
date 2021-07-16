import * as React from "react";
import * as PropTypes from "prop-types";
import Cell from "./Cell";
import { getColumn, getRow, getSquareCells, getValue } from "../../utils";
import type { State } from "../reducer";
import "./square.css";

export type SquareProps = {
    id: number;
    selectCell: (cell: number) => void;
    state: State;
};

const propTypes = {
    /**
     * The square's id in the grid.
     *
     * 0 1 2
     * 3 4 5
     * 6 7 8
     *
     */
    id: PropTypes.number.isRequired,

    /** A function to select the cell. Passed to the Cell components. */
    selectCell: PropTypes.func.isRequired,

    /** The reducer's state. */
    state: PropTypes.any.isRequired,
};

const Square = ({ id, selectCell, state }: SquareProps): JSX.Element => {
    const cells = getSquareCells(state.sudoku, id).map((cell) => ({
        cell,
        value: getValue(state.sudoku, cell),
    }));
    const size = state.initial.length;
    return (
        <div className="sudoku__square">
            {cells.map(({ cell, value }) => {
                const isInSameHouse =
                    getRow(size, cell) === state.selected.row ||
                    getColumn(size, cell) === state.selected.column ||
                    id === state.selected.square;
                return (
                    <Cell
                        key={`cell-${cell}`}
                        value={value}
                        onClick={() => selectCell(cell)}
                        isInvalid={state.invalidCells.has(cell)}
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
