import * as React from "react";
import Controls from "../Controls";
import Grid from "../Grid";
import createKeydownListener from "../keydownListener";
import {
    useSudokuReducer,
    deleteCell,
    fillCell,
    selectCellInDirection,
    toggleNotes,
} from "../reducer";
import { Direction } from "../../../directions";
import styles from "./Sudoku.module.scss";

export type SudokuProps = {
    sudoku: number[][];
};

export default function Sudoku({ sudoku }: SudokuProps): JSX.Element {
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
        <div className={styles.container}>
            <Grid state={state} dispatch={dispatch} />
            <Controls dispatch={dispatch} size={state.board.size} />
        </div>
    );
}
