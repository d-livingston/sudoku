import * as React from "react";
import { Sudoku } from "../../sudoku";
import reducer from "./reducer";
import { SudokuReducerState } from "./types";
export * from "./actions";
export * from "./types";

export function useSudokuReducer(sudoku: number[][]) {
    return React.useReducer(reducer, computeInitialState(sudoku));
}

function computeInitialState(sudoku: number[][]): SudokuReducerState {
    const board = new Sudoku(sudoku);
    return {
        board: board,
        isTakingNotes: false,
        notes: {},
        selected: board.getCellInfo(-1),
    };
}
