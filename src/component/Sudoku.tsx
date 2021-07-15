import * as React from "react";
import * as PropTypes from "prop-types";
import Controls from "./controls";
import Grid from "./grid";
import reducer, {
    computeInitialState,
    select,
    selectInDirection,
    fill,
    remove,
    toggleNotes,
} from "./reducer";
import createKeydownListener from "./onKeydown";
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

    const [showControls, setShowControls] = React.useState(true);

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
            <Grid
                state={state}
                selectCell={selectCell}
                toggleControls={() => setShowControls(!showControls)}
            />
            <Controls
                state={state}
                dispatch={dispatch}
                showControls={showControls}
            />
        </div>
    );
};

Sudoku.propTypes = propTypes;

export default Sudoku;
