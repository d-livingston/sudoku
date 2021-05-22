import * as React from "react";
import { Sudoku } from "../../sudoku";
import reducer from "./reducer";
import { createNotes } from "./notes";
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
        isComplete: board.isComplete(),
        isTakingNotes: false,
        notes: createNotes(board.size),
        selected: board.getCellInfo(-1),
    };
}
