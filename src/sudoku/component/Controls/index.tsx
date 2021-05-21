import * as React from "react";
import classNames from "classnames";
import { Value } from "../Cell";
import {
    deleteCell,
    fillCell,
    toggleNotes,
    SudokuReducerAction,
    SudokuReducerState,
} from "../reducer";
import styles from "./Controls.module.scss";

export type ControlsProps = {
    dispatch: React.Dispatch<SudokuReducerAction>;
    size: number;
    state: SudokuReducerState;
};

export default function Controls({
    dispatch,
    state,
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
                    className={classNames(styles.button, styles.notes_button)}
                    onClick={() => dispatch(toggleNotes())}
                >
                    <div>Notes</div>
                    <svg
                        className={classNames(styles.notes_button_indicator, {
                            [styles.notes_button_indicator_on]:
                                state.isTakingNotes,
                        })}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        width="1px"
                    >
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                        >
                            {state.isTakingNotes ? "ON" : "OFF"}
                        </text>
                    </svg>
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
