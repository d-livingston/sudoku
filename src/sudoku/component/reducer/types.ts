import { Sudoku } from "../../sudoku";

export type Notes = {};

export type SudokuReducerState = {
    board: Sudoku;
    notes: Notes;
    isTakingNotes: boolean;
    selected: {
        cell: number;
        row: number;
        column: number;
        square: number;
        value: number;
    };
};

export enum SudokuReducerActionTypes {
    FILL_CELL = "Fill cell",
    SELECT_CELL = "Select cell",
    SELECT_CELL_IN_DIRECTION = "Select cell in direction",
}

export interface SudokuReducerAction {
    type: SudokuReducerActionTypes;
    payload?: any;
}

export interface SelectCellAction extends SudokuReducerAction {
    payload: {
        cell: number;
    };
}
