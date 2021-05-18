import * as React from "react";
import { Sudoku } from "../sudoku";

declare module "../sudoku" {
    namespace Sudoku {
        export function Component(props: SudokuProps): JSX.Element;
    }
}

export type SudokuProps = {};

Sudoku.Component = function (props: SudokuProps): JSX.Element {
    return <div className="sudoku__container"></div>;
};
