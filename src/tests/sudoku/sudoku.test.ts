import Sudoku from "../../sudoku";
import {
    blank9x9,
    cellsInSudoku9x9,
    rowsInSudoku9x9,
    columnsInSudoku9x9,
    squaresInSudoku9x9,
} from "../fixtures/sudoku/reference";

const sudoku9x9 = new Sudoku(9);

describe("Static method: isValidSize", () => {
    it("determines that positive perfect squares are valid sizes", () => {
        expect(Sudoku.isValidSize(1)).toBe(true);
        expect(Sudoku.isValidSize(4)).toBe(true);
        expect(Sudoku.isValidSize(9)).toBe(true);
        expect(Sudoku.isValidSize(25)).toBe(true);
    });

    it("determines that non-positive perfect squares are invalid sizes", () => {
        expect(Sudoku.isValidSize(-1)).toBe(false);
        expect(Sudoku.isValidSize(-4)).toBe(false);
        expect(Sudoku.isValidSize(-9)).toBe(false);
        expect(Sudoku.isValidSize(-25)).toBe(false);
    });

    it("determines that positive non-perfect squares are invalid sizes", () => {
        expect(Sudoku.isValidSize(2)).toBe(false);
        expect(Sudoku.isValidSize(3)).toBe(false);
        expect(Sudoku.isValidSize(5)).toBe(false);
        expect(Sudoku.isValidSize(6)).toBe(false);
    });

    it("determines that decimals and zero are invalid sizes", () => {
        expect(Sudoku.isValidSize(0)).toBe(false);
        expect(Sudoku.isValidSize(1.5)).toBe(false);
        expect(Sudoku.isValidSize(4.2)).toBe(false);
        expect(Sudoku.isValidSize(25.3)).toBe(false);
    });
});

describe("Static method: generateBlank", () => {
    it("generates a blank 9x9 by default", () => {
        expect(Sudoku.generateBlank()).toEqual(blank9x9);
    });

    it("generates Sudokus of the given size", () => {
        expect(Sudoku.generateBlank(1)).toEqual([[0]]);
        expect(Sudoku.generateBlank(4)).toEqual([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);
        expect(Sudoku.generateBlank(9)).toEqual(blank9x9);
    });

    it("returns an empty array when the size is invalid", () => {
        expect(Sudoku.generateBlank(0)).toEqual([]);
    });
});

describe("Method: getCellId", () => {
    it("gets the correct cell id when provided a valid row and column", () => {
        for (let row = 0; row < sudoku9x9.size; row++) {
            for (let column = 0; column < sudoku9x9.size; column++) {
                expect(sudoku9x9.getCellId(row, column)).toEqual(
                    cellsInSudoku9x9[row][column]
                );
            }
        }
    });

    it("returns -1 when an invalid row or column is provided", () => {
        expect(sudoku9x9.getCellId(-1, 7)).toEqual(-1);
        expect(sudoku9x9.getCellId(7, -1)).toEqual(-1);
    });
});

describe("Method: getRowId", () => {
    it("gets the correct row id when provided a valid cell", () => {
        for (let row = 0; row < sudoku9x9.size; row++) {
            for (let column = 0; column < sudoku9x9.size; column++) {
                expect(
                    sudoku9x9.getRowId(cellsInSudoku9x9[row][column])
                ).toEqual(rowsInSudoku9x9[row][column]);
            }
        }
    });

    it("returns -1 when an invalid cell is provided", () => {
        expect(sudoku9x9.getRowId(-1)).toEqual(-1);
        expect(sudoku9x9.getRowId(81)).toEqual(-1);
        expect(sudoku9x9.getRowId(1.5)).toEqual(-1);
    });
});

describe("Method: getColumnId", () => {
    it("gets the correct column id when provided a valid cell", () => {
        for (let row = 0; row < sudoku9x9.size; row++) {
            for (let column = 0; column < sudoku9x9.size; column++) {
                expect(
                    sudoku9x9.getColumnId(cellsInSudoku9x9[row][column])
                ).toEqual(columnsInSudoku9x9[row][column]);
            }
        }
    });

    it("returns -1 when an invalid cell is provided", () => {
        expect(sudoku9x9.getColumnId(-1)).toEqual(-1);
        expect(sudoku9x9.getColumnId(81)).toEqual(-1);
        expect(sudoku9x9.getColumnId(1.5)).toEqual(-1);
    });
});

describe("Method: getSquareId", () => {
    it("gets the correct sqaure id when provided a valid cell", () => {
        for (let row = 0; row < sudoku9x9.size; row++) {
            for (let column = 0; column < sudoku9x9.size; column++) {
                expect(
                    sudoku9x9.getSquareId(cellsInSudoku9x9[row][column])
                ).toEqual(squaresInSudoku9x9[row][column]);
            }
        }
    });

    it("returns -1 when an invalid cell is provided", () => {
        expect(sudoku9x9.getSquareId(-1)).toEqual(-1);
        expect(sudoku9x9.getSquareId(81)).toEqual(-1);
        expect(sudoku9x9.getSquareId(1.5)).toEqual(-1);
    });
});
