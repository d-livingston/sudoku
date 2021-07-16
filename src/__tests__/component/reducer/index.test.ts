import { computeInitialState } from "../../../component/reducer";
import Notes from "../../../component/reducer/notes";
import { solved } from "../../__fixtures__/sudoku";

it("computes the initial state correctly", () => {
    const sudoku = solved[0].sudoku;
    expect(computeInitialState(sudoku)).toEqual({
        initial: sudoku,
        sudoku,
        selected: {
            cell: -1,
            row: -1,
            column: -1,
            square: -1,
            value: 0,
        },
        notesOn: false,
        notes: new Notes(sudoku.length),
        invalidCells: new Set(),
        isSolved: false,
    });
});
