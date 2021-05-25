import { Sudoku } from "../../sudoku";
import reducer from "./reducer";
import { createNotes } from "./notes";
import { SudokuReducerState } from "./types";
export * from "./actions";
export * from "./types";

export default reducer;

export function computeInitialState(sudoku: number[][]): SudokuReducerState {
    const board = new Sudoku(sudoku);
    return {
        board: board,
        isComplete: board.isComplete(),
        isTakingNotes: false,
        notes: createNotes(board.size),
        selected: board.getCellInfo(-1),
        invalidCells: new Set<number>(),
    };
}
