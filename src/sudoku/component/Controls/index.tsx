import * as React from "react";
import { Value } from "../Cell";
import { SudokuReducerAction } from "../reducer";
import styles from "./Controls.module.scss";

export type ControlsProps = {
    dispatch: React.Dispatch<SudokuReducerAction>;
    size: number;
};

export default function Controls({ size }: ControlsProps): JSX.Element {
    return (
        <div className={styles.container}>
            <div className={styles.number_pad}>
                {Array.from({ length: size }, (_, i) => (
                    <button className={styles.button} key={i}>
                        <Value value={i + 1} />
                    </button>
                ))}
            </div>
            <div className={styles.other}></div>
        </div>
    );
}
