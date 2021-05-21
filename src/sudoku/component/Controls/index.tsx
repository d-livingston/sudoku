import * as React from "react";
import { Value } from "../Cell";
import {
    deleteCell,
    fillCell,
    toggleNotes,
    SudokuReducerAction,
} from "../reducer";
import styles from "./Controls.module.scss";

export type ControlsProps = {
    dispatch: React.Dispatch<SudokuReducerAction>;
    size: number;
};

export default function Controls({
    dispatch,
    size,
}: ControlsProps): JSX.Element {
    return (
        <div className={styles.container}>
            <div className={styles.number_pad}>
                {Array.from({ length: size }, (_, i) => (
                    <button
                        className={styles.button}
                        key={i}
                        onClick={() => dispatch(fillCell(i + 1))}
                    >
                        <Value value={i + 1} />
                    </button>
                ))}
            </div>
            <div className={styles.other}>
                <button
                    className={styles.button}
                    onClick={() => dispatch(toggleNotes())}
                >
                    Notes
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(deleteCell())}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
