import {
    copyColumn,
    copyRow,
    copySquare,
    copySudoku,
    getCell,
    getColumn,
    getColumnCells,
    getInvalidCells,
    getRow,
    getRowCells,
    getSquare,
    getSquareCells,
    getValue,
    isSolvedSudoku,
    isValidSudoku,
} from "../utils";
import { solved, invalid } from "./__fixtures__/sudoku";

const { sudoku } = solved[0];

describe("isSolvedSudoku", () => {
    it("determines that a solved sudoku is solved", () => {
        for (let { solution } of solved) {
            expect(isSolvedSudoku(solution)).toBe(true);
        }
    });

    it("determines that an unsolved sudoku is not solved", () => {
        for (let { sudoku } of solved) {
            expect(isSolvedSudoku(sudoku)).toBe(false);
        }
    });
});

describe("isValidSudoku", () => {
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
});

describe("copySudoku", () => {
    it("copies the sudoku", () => {
        expect(copySudoku(sudoku)).toEqual(sudoku);
    });

    it("produces a deep copy", () => {
        const copy = copySudoku(sudoku);
        copy[0][0]++;
        expect(copy).not.toEqual(sudoku);
    });
});

describe("copyRow", () => {
    it("copies the row", () => {
        expect(copyRow(sudoku, 5)).toEqual([0, 0, 4, 3, 0, 0, 5, 2, 8]);
    });
});

describe("copyColumn", () => {
    it("copies the column", () => {
        expect(copyColumn(sudoku, 6)).toEqual([0, 0, 2, 3, 0, 5, 7, 0, 6]);
    });
});

describe("copySquare", () => {
    it("copies the square", () => {
        expect(copySquare(sudoku, 7)).toEqual([0, 6, 0, 0, 5, 3, 0, 0, 0]);
    });
});

describe("getCell", () => {
    it("gets the cell from a row and column", () => {
        expect(getCell(9, 5, 4)).toBe(49);
    });
});

describe("getRow", () => {
    it("gets the row of the cell", () => {
        expect(getRow(9, 78)).toBe(8);
    });
});

describe("getColumn", () => {
    it("gets the column of the cell", () => {
        expect(getColumn(9, 78)).toBe(6);
    });
});

describe("getSquare", () => {
    it("gets the square of the cell", () => {
        expect(getSquare(9, 78)).toBe(8);
    });
});

describe("getRowCells", () => {
    it("gets the cells in the row", () => {
        expect(getRowCells(9, 4)).toEqual([36, 37, 38, 39, 40, 41, 42, 43, 44]);
    });
});

describe("getColumnCells", () => {
    it("gets the cells in the column", () => {
        const expected = [4, 13, 22, 31, 40, 49, 58, 67, 76];
        expect(getColumnCells(9, 4)).toEqual(expected);
    });
});

describe("getSquareCells", () => {
    it("gets the cells in the square", () => {
        const expected = [33, 34, 35, 42, 43, 44, 51, 52, 53];
        expect(getSquareCells(sudoku, 5)).toEqual(expected);
    });
});

describe("getValue", () => {
    it("gets the value of the cell in the sudoku", () => {
        expect(getValue(sudoku, 47)).toBe(4);
    });
});

describe("getInvalidCells", () => {
    it("gets the set of invalid cells when the row is invalid", () => {
        const invalidCells = getInvalidCells(invalid[0]);
        expect(invalidCells.has(63)).toBe(true);
        expect(invalidCells.has(70)).toBe(true);
    });

    it("gets the set of invalid cells when the column is invalid", () => {
        const invalidCells = getInvalidCells(invalid[1]);
        expect(invalidCells.has(10)).toBe(true);
        expect(invalidCells.has(55)).toBe(true);
    });

    it("gets the set of invalid cells when the square is invalid", () => {
        const invalidCells = getInvalidCells(invalid[2]);
        expect(invalidCells.has(0)).toBe(true);
        expect(invalidCells.has(19)).toBe(true);
    });

    it("returns an empty set when there are no invalid cells", () => {
        expect(getInvalidCells(sudoku).size).toBe(0);
    });
});
