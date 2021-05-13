import Sudoku from "../../sudoku";
import Node from "../../node";

const sudoku9x9 = new Sudoku(9);

describe("getRowIdOfNode", () => {
    it("gets the correct row ID when provided a column node in the first quadrant", () => {
        for (let i = 0; i < sudoku9x9.rowConstraint; i++) {
            const c = Node.createColumn(i);
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
            const c = Node.createColumn(i);
            expect(sudoku9x9.getRowIdOfNode(c)).toEqual(
                Math.floor(count / sudoku9x9.size)
            );
            count++;
        }
    });

    it("returns -1 when provided a column node in the other quadrants", () => {
        for (
            let i = sudoku9x9.columnConstraint;
            i < sudoku9x9.columnsInNetwork;
            i++
        ) {
            const c = Node.createColumn(i);
            expect(sudoku9x9.getRowIdOfNode(c)).toEqual(-1);
        }
    });

    it("gets the correct row ID when provided a row node", () => {
        const c = Node.createColumn(5);
        for (let i = 0; i < sudoku9x9.rowsInNetwork; i++) {
            const n = Node.createNode({ column: c, rowId: i });
            expect(sudoku9x9.getRowIdOfNode(n)).toEqual(
                Math.floor(i / sudoku9x9.rowConstraint)
            );
        }
    });

    it("returns -1 when provided a root node", () => {
        const root = Node.createRoot();
        expect(sudoku9x9.getRowIdOfNode(root)).toEqual(-1);
    });
});

describe("getColumnIdOfNode", () => {
    it("gets the correct column ID when provided a column node in the first quadrant", () => {
        for (let i = 0; i < sudoku9x9.rowConstraint; i++) {
            const c = Node.createColumn(i);
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
            const c = Node.createColumn(i);
            expect(sudoku9x9.getColumnIdOfNode(c)).toEqual(
                Math.floor(count / sudoku9x9.size)
            );
            count++;
        }
    });

    it("returns -1 when provided a column node in the other quadrants", () => {
        for (
            let i = sudoku9x9.rowConstraint;
            i < sudoku9x9.columnConstraint;
            i++
        ) {
            const c = Node.createColumn(i);
            expect(sudoku9x9.getColumnIdOfNode(c)).toEqual(-1);
        }

        for (
            let i = sudoku9x9.squareConstraint;
            i < sudoku9x9.columnsInNetwork;
            i++
        ) {
            const c = Node.createColumn(i);
            expect(sudoku9x9.getColumnIdOfNode(c)).toEqual(-1);
        }
    });

    it("gets the correct column ID when provided a row node", () => {
        const c = Node.createColumn(5);
        for (let i = 0; i < sudoku9x9.rowsInNetwork; i++) {
            const n = Node.createNode({ column: c, rowId: i });
            expect(sudoku9x9.getColumnIdOfNode(n)).toEqual(
                Math.floor(i / sudoku9x9.size) % sudoku9x9.size
            );
        }
    });

    it("returns -1 when provided a root node", () => {
        const root = Node.createRoot();
        expect(sudoku9x9.getRowIdOfNode(root)).toEqual(-1);
    });
});

describe("getSquareIdOfNode", () => {
    it("gets the correct square ID when provided a column node in the first quadrant", () => {
        for (let i = 0; i < sudoku9x9.rowConstraint; i++) {
            const c = Node.createColumn(i);
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
            const c = Node.createColumn(i);
            expect(sudoku9x9.getSquareIdOfNode(c)).toEqual(
                Math.floor(count / sudoku9x9.size)
            );
            count++;
        }
    });

    it("returns -1 when provided a column node in the other quadrants", () => {
        for (
            let i = sudoku9x9.rowConstraint;
            i < sudoku9x9.squareConstraint;
            i++
        ) {
            const c = Node.createColumn(i);
            expect(sudoku9x9.getSquareIdOfNode(c)).toEqual(-1);
        }
    });

    it("gets the correct square ID when provided a row node", () => {
        const c = Node.createColumn(5);
        for (let i = 0; i < sudoku9x9.rowsInNetwork; i++) {
            const n = Node.createNode({ column: c, rowId: i });
            expect(sudoku9x9.getSquareIdOfNode(n)).toEqual(
                sudoku9x9.getSquareId(
                    sudoku9x9.getCellId(
                        sudoku9x9.getRowIdOfNode(n),
                        sudoku9x9.getColumnIdOfNode(n)
                    )
                )
            );
        }
    });

    it("returns -1 when provided a root node", () => {
        const root = Node.createRoot();
        expect(sudoku9x9.getRowIdOfNode(root)).toEqual(-1);
    });
});

describe("getCellIdOfNode", () => {
    it("gets the correct cell ID when provided a column node in the first quadrant", () => {
        for (let i = 0; i < sudoku9x9.rowConstraint; i++) {
            const c = Node.createColumn(i);
            expect(sudoku9x9.getCellIdOfNode(c)).toEqual(i);
        }
    });

    it("returns -1 when provided a column node in the other quadrants", () => {
        for (
            let i = sudoku9x9.rowConstraint;
            i < sudoku9x9.columnsInNetwork;
            i++
        ) {
            const c = Node.createColumn(i);
            expect(sudoku9x9.getCellIdOfNode(c)).toEqual(-1);
        }
    });

    it("gets the correct cell ID when provided a row node", () => {
        const c = Node.createColumn(5);
        for (let i = 0; i < sudoku9x9.rowsInNetwork; i++) {
            const n = Node.createNode({ column: c, rowId: i });
            expect(sudoku9x9.getCellIdOfNode(n)).toEqual(
                sudoku9x9.getCellId(
                    sudoku9x9.getRowIdOfNode(n),
                    sudoku9x9.getColumnIdOfNode(n)
                )
            );
        }
    });

    it("returns -1 when provided a root node", () => {
        const root = Node.createRoot();
        expect(sudoku9x9.getRowIdOfNode(root)).toEqual(-1);
    });
});

describe("getValueOfNode", () => {
    it("gets the correct value when provided a column node in the other quadrants", () => {
        for (
            let i = sudoku9x9.rowConstraint;
            i < sudoku9x9.columnsInNetwork;
            i++
        ) {
            const c = Node.createColumn(i);
            expect(sudoku9x9.getValueOfNode(c)).toEqual(
                (i % sudoku9x9.size) + 1
            );
        }
    });

    it("returns -1 when provided a column node in the first quadrants", () => {
        for (let i = 0; i < sudoku9x9.rowConstraint; i++) {
            const c = Node.createColumn(i);
            expect(sudoku9x9.getValueOfNode(c)).toEqual(-1);
        }
    });

    it("gets the correct cell ID when provided a row node", () => {
        const c = Node.createColumn(5);
        for (let i = 0; i < sudoku9x9.rowsInNetwork; i++) {
            const n = Node.createNode({ column: c, rowId: i });
            expect(sudoku9x9.getValueOfNode(n)).toEqual(
                (i % sudoku9x9.size) + 1
            );
        }
    });

    it("returns -1 when provided a root node", () => {
        const root = Node.createRoot();
        expect(sudoku9x9.getRowIdOfNode(root)).toEqual(-1);
    });
});
