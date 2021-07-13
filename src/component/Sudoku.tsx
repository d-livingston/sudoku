import * as React from "react";
import * as PropTypes from "prop-types";
import Square from "./Square";
import reducer, { computeInitialState, select } from "./reducer";
import { getSquareCells, getValue } from "../utils";
import "./globals.css";
import "./sudoku.css";

export type SudokuProps = {
    sudoku: number[][];
};

const propTypes = {
    sudoku: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
    ).isRequired,
};

const Sudoku: React.FC<SudokuProps> = ({ sudoku: initial }) => {
    const [state, dispatch] = React.useReducer(
        reducer,
        computeInitialState(initial)
    );

    const selectCell = (cell: number) => {
        console.log("SELECTING CELL " + cell);
        dispatch(select(cell));
    };

    return (
        <div className="sudoku__container">
            <div className="sudoku__board">
                {Array.from({ length: state.sudoku.length }, (_, i) => i).map(
                    (squareId) => {
                        return (
                            <Square
                                key={squareId}
                                cells={getSquareCells(
                                    state.sudoku,
                                    squareId
                                ).map((cell) => ({
                                    cell,
                                    value: getValue(state.sudoku, cell),
                                }))}
                                selectCell={selectCell}
                            />
                        );
                    }
                )}
            </div>
        </div>
    );
};

Sudoku.propTypes = propTypes;

export default Sudoku;
