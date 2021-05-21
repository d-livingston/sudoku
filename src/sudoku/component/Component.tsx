import * as React from "react";
import Grid from "./Grid";
import createKeydownListener from "./keydownListener";
import {
    useSudokuReducer,
    deleteCell,
    fillCell,
    selectCellInDirection,
    toggleNotes,
} from "./reducer";
import { Direction } from "../../directions";

export type ComponentProps = {
    sudoku: number[][];
};

export function Component({ sudoku }: ComponentProps): JSX.Element {
    const [state, dispatch] = useSudokuReducer(sudoku);

    const onKeydown = createKeydownListener(
        (value: number) => dispatch(fillCell(value)),
        () => dispatch(deleteCell()),
        (direction: Direction) => dispatch(selectCellInDirection(direction)),
        () => dispatch(toggleNotes())
    );
    React.useEffect(() => {
        window.addEventListener("keydown", onKeydown);

        return () => {
            window.removeEventListener("keydown", onKeydown);
        };
    }, [onKeydown]);

    return (
        <div>
            <Grid state={state} dispatch={dispatch} />
        </div>
    );
}
