import * as React from "react";
import * as PropTypes from "prop-types";
import Square from "./Square";
import { State } from "../reducer";
import { getSquareCells, getValue } from "../../utils";
import "./grid.css";

export type GridProps = {
    state: State;
    selectCell: (cell: number) => void;
};

const propTypes = {
    state: PropTypes.any.isRequired,
    selectCell: PropTypes.func.isRequired,
};

const Grid: React.FC<GridProps> = ({ state, selectCell }) => {
    return (
        <div className="sudoku__grid">
            {Array.from({ length: state.sudoku.length }, (_, i) => i).map(
                (squareId) => {
                    return (
                        <Square
                            key={squareId}
                            id={squareId}
                            cells={getSquareCells(state.sudoku, squareId).map(
                                (cell) => ({
                                    cell,
                                    value: getValue(state.sudoku, cell),
                                })
                            )}
                            selectCell={selectCell}
                            state={state}
                        />
                    );
                }
            )}
        </div>
    );
};

Grid.propTypes = propTypes;

export default Grid;
