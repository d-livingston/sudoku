import * as React from "react";
import * as PropTypes from "prop-types";
import Square from "./Square";
import { State } from "../reducer";
import "./grid.css";

export type GridProps = {
    state: State;
    selectCell: (cell: number) => void;
};

const propTypes = {
    /** The reducer state. */
    state: PropTypes.any.isRequired,

    /** The dispatch function to select a cell. */
    selectCell: PropTypes.func.isRequired,
};

const Grid = ({ state, selectCell }: GridProps): JSX.Element => {
    return (
        <div className="sudoku__grid">
            {Array.from({ length: state.sudoku.length }, (_, i) => i).map(
                (squareId) => {
                    return (
                        <Square
                            key={squareId}
                            id={squareId}
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
