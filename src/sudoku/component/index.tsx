import { Sudoku } from "../sudoku";
import Component, { SudokuProps } from "./Sudoku";

declare module "../sudoku" {
    namespace Sudoku {
        export function Component(props: SudokuProps): JSX.Element;
    }
}

Sudoku.Component = Component;
