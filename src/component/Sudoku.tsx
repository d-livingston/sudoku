import * as React from "react";
import * as PropTypes from "prop-types";
import Square from "./Square";
import reducer, {
    computeInitialState,
    select,
    selectInDirection,
    fill,
    remove,
    toggleNotes,
} from "./reducer";
import createKeydownListener from "./onKeydown";
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

    const selectCell = (cell: number) => dispatch(select(cell));

    React.useEffect(() => {
        const onKeydown = createKeydownListener({
            onNumberKey: (value: number) => dispatch(fill(value)),
            onRemoveKey: () => dispatch(remove()),
            onDirectionKey: (direction: "left" | "right" | "up" | "down") =>
                dispatch(selectInDirection(direction)),
            onNotesToggleKey: () => dispatch(toggleNotes()),
        });
        window && window.addEventListener("keydown", onKeydown);

        return () => {
            window && window.removeEventListener("keydown", onKeydown);
        };
    }, []);

    return (
        <div id="sudoku" className="sudoku__container">
            <div className="sudoku__board">
                {Array.from({ length: state.sudoku.length }, (_, i) => i).map(
                    (squareId) => {
                        return (
                            <Square
                                key={squareId}
                                id={squareId}
                                cells={getSquareCells(
                                    state.sudoku,
                                    squareId
                                ).map((cell) => ({
                                    cell,
                                    value: getValue(state.sudoku, cell),
                                }))}
                                selectCell={selectCell}
                                state={state}
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
