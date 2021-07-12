import Network from "./network";
import type { Node, Column } from "./node";

export function createBlankSudokuNetwork(size: number): Network {
    return new Network(
        getNumberOfRows(size),
        getNumberOfColumns(size),
        getIsNodePredicate(size)
    );
}

function getIsNodePredicate(
    size: number
): (row: number, column: number) => boolean {
    const sqrt = Math.sqrt(size);
    const rowConstraint = getRowConstraint(size);
    const columnConstraint = getColumnConstraint(size);
    const squareConstraint = getSquareConstraint(size);
    const columns = getNumberOfColumns(size);

    return (row: number, column: number): boolean => {
        if (column < rowConstraint) {
            return column === Math.floor(row / size);
        } else if (column < columnConstraint) {
            return (
                column - rowConstraint ===
                Math.floor(row / rowConstraint) * size + (row % size)
            );
        } else if (column < squareConstraint) {
            return column - columnConstraint === row % rowConstraint;
        } else if (column < columns) {
            return (
                column - squareConstraint ===
                Math.floor(row / squareConstraint) * sqrt * size +
                    (Math.floor(row / (sqrt * size)) % sqrt) * size +
                    (row % size)
            );
        } else {
            return false;
        }
    };
}

export function removeMatchingNodes(
    network: Network,
    sudoku: number[][]
): void {
    const matchingNodes = getMatchingNodes(network, sudoku);
    matchingNodes.forEach((node) => {
        network.addToSolution(node);
    });
}

export function getSudokuSolution(
    networkSolution: Node[],
    initial: number[][]
): number[][] {
    const size = initial.length;
    const solution = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => 0)
    );
    networkSolution.forEach((node) => {
        const row = getRowInSudoku(node, size);
        const column = getColumnInSudoku(node, size);
        const value = getValueInSudoku(node, size);

        if (row !== -1 && column !== -1 && value !== -1)
            solution[row][column] = value;
    });
    return solution;
}

function getMatchingNodes(network: Network, sudoku: number[][]): Node[] {
    const size: number = sudoku.length;
    const maxColumn: number = getRowConstraint(size);
    const matchingNodes: Node[] = [];
    let column: Column = network.root.right;
    while (!column.isRoot() && column.columnId < maxColumn) {
        let node: Node = column.down;
        while (!node.isColumn()) {
            const row = getRowInSudoku(node, size);
            const column = getColumnInSudoku(node, size);
            const value = getValueInSudoku(node, size);
            if (sudoku[row][column] === value) matchingNodes.push(node);
            node = node.down;
        }
        column = column.right;
    }

    let c: Column = network.root.right;
    while (c !== network.root) {
        let n: Node = c.down;
        while (n !== c) {
            n = n.down;
        }
        c = c.right;
    }

    return matchingNodes;
}

function getRowInSudoku(node: Node, size: number): number {
    if (node.isRoot()) return -1;

    const rowConstraint = getRowConstraint(size);
    if (node.isColumn()) {
        if (node.columnId < rowConstraint)
            return Math.floor(node.columnId / size);
        const columnConstraint = getColumnConstraint(size);
        if (node.columnId < columnConstraint)
            return Math.floor((node.columnId - rowConstraint) / size);
        return -1;
    }
    return Math.floor(node.rowId / rowConstraint);
}

function getColumnInSudoku(node: Node, size: number): number {
    if (node.isRoot()) return -1;

    if (node.isColumn()) {
        const rowConstraint = getRowConstraint(size);
        if (node.columnId < rowConstraint) return node.columnId % size;
        const columnConstraint = getColumnConstraint(size);
        const squareConstraint = getSquareConstraint(size);
        if (
            node.columnId >= columnConstraint &&
            node.columnId < squareConstraint
        )
            return Math.floor((node.columnId - columnConstraint) / size);
        return -1;
    }
    return Math.floor(node.rowId / size) % size;
}

function getValueInSudoku(node: Node, size: number): number {
    if (node.isRoot()) return -1;

    if (node.isColumn()) {
        const rowConstraint = getRowConstraint(size);
        if (
            node.columnId >= rowConstraint &&
            node.columnId < getNumberOfColumns(size)
        ) {
            return (node.columnId % size) + 1;
        }
        return -1;
    }

    return (node.rowId % size) + 1;
}

function getRowConstraint(size: number): number {
    return size * size;
}

function getColumnConstraint(size: number): number {
    return size * size * 2;
}

function getSquareConstraint(size: number): number {
    return size * size * 3;
}

function getNumberOfColumns(size: number): number {
    return size * size * 4;
}

function getNumberOfRows(size: number): number {
    return size * size * size;
}
