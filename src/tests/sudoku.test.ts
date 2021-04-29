import Sudoku from "../sudoku";
import Node from "../node";
import {
    rowsInSudoku9x9,
    columnsInSudoku9x9,
    squaresInSudoku9x9,
    cellsInSudoku9x9,
} from "./fixtures/sudoku/reference";

const sudoku9x9 = new Sudoku(9);

describe("getCellId", () => {
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

describe("getRowId", () => {
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

describe("getColumnId", () => {
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

describe("getSquareId", () => {
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

describe("getHouseIdsOfCell", () => {
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

describe("getCellIdsInRow", () => {
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

describe("getCellIdsInColumn", () => {
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

describe("getCellIdsInSquare", () => {
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

describe("getRowIdOfNode", () => {
    it("gets the correct row ID when provided a column node in the first quadrant", () => {
        for (let i = 0; i < sudoku9x9.rowConstraint; i++) {
            const c = new Node(i);
            expect(sudoku9x9.getRowIdOfNode(c)).toEqual(sudoku9x9.getRowId(i));
        }
    });

    it("gets the correct row ID when provided a column node in the second quadrant", () => {
        let count = 0;
        for (
            let i = sudoku9x9.rowConstraint;
            i < sudoku9x9.columnConstraint;
            i++
        ) {
            const c = new Node(i);
            expect(sudoku9x9.getRowIdOfNode(c)).toEqual(
                Math.floor(count / sudoku9x9.size)
            );
            count++;
        }
    });

    it("gets the correct row ID when provided a column node in the other quadrants", () => {
        for (
            let i = sudoku9x9.columnConstraint;
            i < sudoku9x9.columnsInNetwork;
            i++
        ) {
            const c = new Node(i);
            expect(sudoku9x9.getRowIdOfNode(c)).toEqual(-1);
        }
    });

    it("gets the correct row ID when provided a row node", () => {
        let count = 0;
        for (let i = 0; i < sudoku9x9.rowsInNetwork; i++) {
            const n = new Node(5, i);
            expect(sudoku9x9.getRowIdOfNode(n)).toEqual(
                Math.floor(count / sudoku9x9.rowConstraint)
            );
            count++;
        }
    });
});

describe("getColumnIdOfNode", () => {
    it("gets the correct column ID when provided a column node in the first quadrant", () => {
        for (let i = 0; i < sudoku9x9.rowConstraint; i++) {
            const c = new Node(i);
            expect(sudoku9x9.getColumnIdOfNode(c)).toEqual(
                sudoku9x9.getColumnId(i)
            );
        }
    });

    it("gets the correct column ID when provided a column node in the third quadrant", () => {
        let count = 0;
        for (
            let i = sudoku9x9.columnConstraint;
            i < sudoku9x9.squareConstraint;
            i++
        ) {
            const c = new Node(i);
            expect(sudoku9x9.getColumnIdOfNode(c)).toEqual(
                Math.floor(count / sudoku9x9.size)
            );
            count++;
        }
    });

    it("gets the correct column ID when provided a column node in the other quadrants", () => {
        for (
            let i = sudoku9x9.rowConstraint;
            i < sudoku9x9.columnConstraint;
            i++
        ) {
            const c = new Node(i);
            expect(sudoku9x9.getColumnIdOfNode(c)).toEqual(-1);
        }

        for (
            let i = sudoku9x9.squareConstraint;
            i < sudoku9x9.columnsInNetwork;
            i++
        ) {
            const c = new Node(i);
            expect(sudoku9x9.getColumnIdOfNode(c)).toEqual(-1);
        }
    });

    it("gets the correct column ID when provided a row node", () => {
        let count = 0;
        for (let i = 0; i < sudoku9x9.rowsInNetwork; i++) {
            const n = new Node(5, i);
            expect(sudoku9x9.getColumnIdOfNode(n)).toEqual(
                Math.floor(count / sudoku9x9.size) % sudoku9x9.size
            );
            count++;
        }
    });
});

// TODO: keep fixing this
describe("getSquareIdOfNode", () => {
    it("gets the correct square ID when provided a column node in the first quadrant", () => {
        for (let i = 0; i < sudoku9x9.rowConstraint; i++) {
            const c = new Node(i);
            expect(sudoku9x9.getSquareIdOfNode(c)).toEqual(
                sudoku9x9.getSquareId(i)
            );
        }
    });

    it("gets the correct square ID when provided a column node in the fourth quadrant", () => {
        let count = 0;
        for (
            let i = sudoku9x9.squareConstraint;
            i < sudoku9x9.columnsInNetwork;
            i++
        ) {
            const c = new Node(i);
            expect(sudoku9x9.getSquareIdOfNode(c)).toEqual(
                Math.floor(count / sudoku9x9.size)
            );
            count++;
        }
    });

    it("gets the correct square ID when provided a column node in the other quadrants", () => {
        for (
            let i = sudoku9x9.rowConstraint;
            i < sudoku9x9.squareConstraint;
            i++
        ) {
            const c = new Node(i);
            expect(sudoku9x9.getSquareIdOfNode(c)).toEqual(-1);
        }
    });

    it("gets the correct square ID when provided a row node", () => {
        let count = 0;
        for (let i = 0; i < sudoku9x9.rowsInNetwork; i++) {
            const n = new Node(5, i);
            expect(sudoku9x9.getSquareIdOfNode(n)).toEqual(
                Math.floor(count / sudoku9x9.rowConstraint)
            );
            count++;
        }
    });
});
