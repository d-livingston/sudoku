import { Sudoku } from "../../sudoku";

export type CellNotes = boolean[];
export type Notes = CellNotes[];

export type SudokuReducerState = {
    board: Sudoku;
    notes: Notes;
    isComplete: boolean;
    isTakingNotes: boolean;
    selected: {
        cell: number;
        row: number;
        column: number;
        square: number;
        value: number;
    };
    invalidCells: Set<number>;
};

export enum SudokuReducerActionTypes {
    DELETE_CELL = "Delete cell",
    FILL_CELL = "Fill cell",
    SELECT_CELL = "Select cell",
    SELECT_CELL_IN_DIRECTION = "Select cell in direction",
    TOGGLE_NOTES = "Toggle notes",
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
