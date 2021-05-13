import { Sudoku } from "./sudoku";
import Node from "../node";

declare module "./sudoku" {
    interface Sudoku {
        getRowIdOfNode(node: Node): number;
        getColumnIdOfNode(node: Node): number;
        getSquareIdOfNode(node: Node): number;
        getCellIdOfNode(node: Node): number;
        getValueOfNode(node: Node): number;
        isNode(row: number, column: number): boolean;
    }
}

Sudoku.prototype.getRowIdOfNode = function (node: Node): number {
    const { rowId, columnId } = node;
    // Root
    if (rowId === -1 && columnId === -1) return -1;

    // Node
    if (!node.isColumn) return Math.floor(rowId / this.rowConstraint);

    // Column
    if (columnId < this.rowConstraint) return this.getRowId(columnId);
    else if (columnId < this.columnConstraint)
        return Math.floor((columnId - this.rowConstraint) / this.size);
    else return -1;
};

Sudoku.prototype.getColumnIdOfNode = function (node: Node): number {
    const { rowId, columnId } = node;
    // Root
    if (rowId === -1 && columnId === -1) return -1;

    // Node
    if (!node.isColumn) return Math.floor(rowId / this.size) % this.size;

    // Column
    if (columnId < this.rowConstraint) return this.getColumnId(columnId);
    else if (
        columnId >= this.columnConstraint &&
        columnId < this.squareConstraint
    ) {
        return Math.floor((columnId - this.columnConstraint) / this.size);
    } else return -1;
};

Sudoku.prototype.getSquareIdOfNode = function (node: Node): number {
    const { rowId, columnId } = node;
    // Root
    if (rowId === -1 && columnId === -1) return -1;

    // Node
    if (!node.isColumn) {
        const cell = this.getCellIdOfNode(node);
        return this.getSquareId(cell);
    }

    // Column
    if (columnId < this.rowConstraint) return this.getSquareId(columnId);
    else if (columnId >= this.squareConstraint)
        return Math.floor((columnId - this.squareConstraint) / this.size);
    else return -1;
};

Sudoku.prototype.getCellIdOfNode = function (node: Node): number {
    const { rowId, columnId } = node;
    // Root
    if (rowId === -1 && columnId === -1) return -1;

    // Node
    if (!node.isColumn) {
        const row = this.getRowIdOfNode(node);
        const column = this.getColumnIdOfNode(node);
        return this.getCellId(row, column);
    }

    // Column
    if (columnId < this.rowConstraint) return columnId;
    else return -1;
};

Sudoku.prototype.getValueOfNode = function (node: Node): number {
    const { rowId, columnId } = node;
    // Root
    if (rowId === -1 && columnId === -1) return -1;

    // Node
    if (!node.isColumn) return (rowId % this.size) + 1;

    // Column
    if (columnId >= this.rowConstraint) return (columnId % this.size) + 1;
    else return -1;
};

Sudoku.prototype.isNode = function (row: number, column: number): boolean {
    // First constraint quadrant (cell)
    if (column < this.rowConstraint)
        return column === Math.floor(row / this.size);
    // Second constraint quadrant (row)
    else if (column < this.columnConstraint)
        return (
            column - this.rowConstraint ===
            Math.floor(row / this.rowConstraint) * this.size + (row % this.size)
        );
    // Third constraint quadrant (column)
    else if (column < this.squareConstraint)
        return column - this.columnConstraint === row % this.rowConstraint;
    // Fourth constraint quadrant (square)
    else
        return (
            column - this.squareConstraint ===
            Math.floor(row / this.squareConstraint) * this.sqrt * this.size +
                (Math.floor(row / (this.sqrt * this.size)) % this.sqrt) *
                    this.size +
                (row % this.size)
        );
};
