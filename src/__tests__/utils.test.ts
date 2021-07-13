import { copyColumn, copyRow, copySquare, isValidSudoku } from "../utils";
import { solved, invalid } from "./__fixtures__/sudoku";

const { sudoku } = solved[0];

it("determines that a valid Sudoku is valid", () => {
    for (let { sudoku } of solved) {
        expect(isValidSudoku(sudoku)).toBe(true);
    }
});

it("determines that an invalid Sudoku is invalid", () => {
    for (let sudoku of invalid) {
        expect(isValidSudoku(sudoku)).toBe(false);
    }
});

it("copies the row", () => {
    expect(copyRow(sudoku, 5)).toEqual([0, 0, 4, 3, 0, 0, 5, 2, 8]);
});

it("copies the column", () => {
    expect(copyColumn(sudoku, 6)).toEqual([0, 0, 2, 3, 0, 5, 7, 0, 6]);
});

it("copies the square", () => {
    expect(copySquare(sudoku, 7)).toEqual([0, 6, 0, 0, 5, 3, 0, 0, 0]);
});
