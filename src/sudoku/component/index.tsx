import * as React from "react";
import { Sudoku } from "../sudoku";
import styles from "./Sudoku.module.scss";

declare module "../sudoku" {
    namespace Sudoku {
        export function Component(props: SudokuProps): JSX.Element;
    }
}

export type SudokuProps = {
    sudoku: number[][];
};

Sudoku.Component = function (_: SudokuProps): JSX.Element {
    return (
        <div className={styles.container}>
            <div className="sudoku__grid"></div>
        </div>
    );
};
