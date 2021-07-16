import type { Notes } from "./notes";

export type State = {
    initial: number[][];
    sudoku: number[][];
    selected: {
        cell: number;
        row: number;
        column: number;
        square: number;
        value: number;
    };
    notesOn: boolean;
    notes: Notes;
    invalidCells: Set<number>;
    isSolved: boolean;
};
