import Sudoku from "../../sudoku";
import {
    blank9x9,
    cellsInSudoku9x9,
    rowsInSudoku9x9,
    columnsInSudoku9x9,
    squaresInSudoku9x9,
} from "../fixtures/sudoku/reference";
import { solvedSudokus9x9 } from "../fixtures/sudoku/solutions";
import { invalidSudokus9x9, validSudokus9x9 } from "../fixtures/sudoku/valid";

const sudoku9x9 = new Sudoku(9);

describe("constructor", () => {
    it("constructs a Sudoku object when provided a size", () => {
        const sudoku = new Sudoku(9);
        expect(sudoku.size).toBe(9);
        expect(sudoku.sudoku).toEqual(blank9x9);
    });

    it("constructs a Sudoku object when provided a Sudoku puzzle", () => {
        const sudoku = new Sudoku(validSudokus9x9[0]);
        expect(sudoku.size).toBe(validSudokus9x9[0].length);
        expect(sudoku.sudoku).toEqual(validSudokus9x9[0]);
    });
});

describe("Static Method: isValid", () => {
    it("determines a valid Sudoku is valid", () => {
        for (let sudoku of validSudokus9x9) {
            expect(Sudoku.isValid(sudoku)).toBe(true);
        }
    });

    it("determines an invalid Sudoku is invalid", () => {
        for (let sudoku of invalidSudokus9x9) {
            expect(Sudoku.isValid(sudoku)).toBe(false);
        }
    });
});

describe("Static method: isComplete", () => {
    it("determines that a complete Sudoku is complete", () => {
        for (let { solution } of solvedSudokus9x9) {
            expect(Sudoku.isComplete(solution)).toBe(true);
        }
    });

    it("determines that a Sudoku that is not filled is incomplete", () => {
        for (let { sudoku } of solvedSudokus9x9) {
            expect(Sudoku.isComplete(sudoku)).toBe(false);
        }
    });
});

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

describe("Method: getCellIdInDirection", () => {
    describe("left", () => {
        it("gets the cell to the left when in the middle of the sudoku", () => {
            expect(sudoku9x9.getCellIdInDirection(5, "left")).toBe(4);
        });
        it("gets the cell to the left when on the leftmost edge of the sudoku", () => {
            expect(sudoku9x9.getCellIdInDirection(0, "left")).toBe(8);
        });
        it("returns -1 when an invalid cell is provided", () => {
            expect(sudoku9x9.getCellIdInDirection(-1, "left")).toBe(-1);
        });
    });

    describe("right", () => {
        it("gets the cell to the right when in the middle of the sudoku", () => {
            expect(sudoku9x9.getCellIdInDirection(5, "right")).toBe(6);
        });
        it("gets the cell to the right when on the rightmost edge of the sudoku", () => {
            expect(sudoku9x9.getCellIdInDirection(8, "right")).toBe(0);
        });
        it("returns -1 when an invalid cell is provided", () => {
            expect(sudoku9x9.getCellIdInDirection(-1, "right")).toBe(-1);
        });
    });

    describe("up", () => {
        it("gets the cell to the top when in the middle of the sudoku", () => {
            expect(sudoku9x9.getCellIdInDirection(14, "up")).toBe(5);
        });
        it("gets the cell to the top when on the upmost edge of the sudoku", () => {
            expect(sudoku9x9.getCellIdInDirection(4, "up")).toBe(76);
        });
        it("returns -1 when an invalid cell is provided", () => {
            expect(sudoku9x9.getCellIdInDirection(-1, "up")).toBe(-1);
        });
    });

    describe("down", () => {
        it("gets the cell to the top when in the middle of the sudoku", () => {
            expect(sudoku9x9.getCellIdInDirection(5, "down")).toBe(14);
        });
        it("gets the cell to the top when on the upmost edge of the sudoku", () => {
            expect(sudoku9x9.getCellIdInDirection(76, "down")).toBe(4);
        });
        it("returns -1 when an invalid cell is provided", () => {
            expect(sudoku9x9.getCellIdInDirection(-1, "down")).toBe(-1);
        });
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

describe("Method: getHouseIdsOfCell", () => {
    it("gets the correct house ids when provided a valid cell", () => {
        for (let row = 0; row < sudoku9x9.size; row++) {
            for (let column = 0; column < sudoku9x9.size; column++) {
                expect(
                    sudoku9x9.getHouseIdsOfCell(cellsInSudoku9x9[row][column])
                ).toEqual({
                    row: rowsInSudoku9x9[row][column],
                    column: columnsInSudoku9x9[row][column],
                    square: squaresInSudoku9x9[row][column],
                });
            }
        }
    });

    it("returns -1s when an invalid cell is provided", () => {
        const invalid = {
            row: -1,
            column: -1,
            square: -1,
        };
        expect(sudoku9x9.getHouseIdsOfCell(-1)).toEqual(invalid);
        expect(sudoku9x9.getHouseIdsOfCell(81)).toEqual(invalid);
        expect(sudoku9x9.getHouseIdsOfCell(1.5)).toEqual(invalid);
    });
});

describe("Method: getCellIdsInRow", () => {
    it("gets the correct cells when provided a valid row", () => {
        for (let row = 0; row < sudoku9x9.size; row++) {
            const cells = sudoku9x9.getCellIdsInRow(row);
            expect(cells).toHaveLength(sudoku9x9.size);
            expect(cells).toHaveNoDuplicates();

            cells.forEach((cell) => {
                const row = sudoku9x9.getRowId(cell);
                const column = sudoku9x9.getColumnId(cell);
                expect(row).toEqual(rowsInSudoku9x9[row][column]);
            });
        }
    });

    it("returns an empty array when provided an invalid row", () => {
        expect(sudoku9x9.getCellIdsInRow(-1)).toEqual([]);
        expect(sudoku9x9.getCellIdsInRow(9)).toEqual([]);
        expect(sudoku9x9.getCellIdsInRow(1.5)).toEqual([]);
    });
});

describe("Method: getCellIdsInColumn", () => {
    it("gets the correct cells when provided a valid column", () => {
        for (let column = 0; column < sudoku9x9.size; column++) {
            const cells = sudoku9x9.getCellIdsInColumn(column);
            expect(cells).toHaveLength(sudoku9x9.size);
            expect(cells).toHaveNoDuplicates();

            cells.forEach((cell) => {
                const row = sudoku9x9.getRowId(cell);
                const column = sudoku9x9.getColumnId(cell);
                expect(column).toEqual(columnsInSudoku9x9[row][column]);
            });
        }
    });

    it("returns an empty array when provided an invalid column", () => {
        expect(sudoku9x9.getCellIdsInColumn(-1)).toEqual([]);
        expect(sudoku9x9.getCellIdsInColumn(9)).toEqual([]);
        expect(sudoku9x9.getCellIdsInColumn(1.5)).toEqual([]);
    });
});

describe("Method: getCellIdsInSquare", () => {
    it("gets the correct cells when provided a valid square", () => {
        for (let square = 0; square < sudoku9x9.size; square++) {
            const cells = sudoku9x9.getCellIdsInSquare(square);
            expect(cells).toHaveLength(sudoku9x9.size);
            expect(cells).toHaveNoDuplicates();

            cells.forEach((cell) => {
                const row = sudoku9x9.getRowId(cell);
                const column = sudoku9x9.getColumnId(cell);
                const square = sudoku9x9.getSquareId(cell);
                expect(square).toEqual(squaresInSudoku9x9[row][column]);
            });
        }
    });

    it("returns an empty array when provided an invalid square", () => {
        expect(sudoku9x9.getCellIdsInSquare(-1)).toEqual([]);
        expect(sudoku9x9.getCellIdsInSquare(9)).toEqual([]);
        expect(sudoku9x9.getCellIdsInSquare(1.5)).toEqual([]);
    });
});

describe("Method: getInvalidCells", () => {
    it("returns an empty set when the sudoku is valid", () => {
        const board = new Sudoku(validSudokus9x9[0]);
        expect(board.getInvalidCells()).toEqual(new Set());
    });

    it("gets all invalid cells", () => {
        const board = new Sudoku(validSudokus9x9[0]);
        board.setValue(8, 9);
        board.setValue(80, 3);
        expect([...board.getInvalidCells()]).toEqual([0, 8, 17, 79, 80]);
    });
});
