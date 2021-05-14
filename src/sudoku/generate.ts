import { Sudoku } from "./sudoku";
import Network, { NetworkEventType } from "../network";
import Node from "../node";
import "./network";
import "./solve";
import { GenerateResult } from "./types";

declare module "./sudoku" {
    namespace Sudoku {
        export function generate(size?: number): GenerateResult;
        export function generateComplete(size?: number): number[][];
    }
}

Sudoku.generate = function (size: number = 9): GenerateResult {
    const startTime = Date.now();
    const solution = Sudoku.generateComplete(size);
    const sudoku = new Sudoku(size);
    const network = sudoku.createNetwork();

    const initialCells = getInitialCellsToRemove(sudoku);
    fillCells(sudoku, network, solution, initialCells);

    let hasMultipleSolutions = true;
    let columnsTried = 0,
        nodesTried = 0;
    while (hasMultipleSolutions) {
        removeLargestColumn(sudoku, network, solution);

        const result = network.solve();
        hasMultipleSolutions = result.hasMultipleSolutions;

        if (!hasMultipleSolutions) {
            columnsTried = result.columnsTried;
            nodesTried = result.nodesTried;
        }
    }

    const generatedSudoku = sudoku.convertNodesToSudoku(
        network.currentSolutionState
    );

    return {
        sudoku: generatedSudoku,
        solution,
        numFilledCells: getNumFilledCells(generatedSudoku),
        timeElapsed: Date.now() - startTime,
        backtrackingDetails: {
            columnsTried,
            nodesTried,
        },
    };
};

function getInitialCellsToRemove(sudoku: Sudoku): number[] {
    const cells: number[] = [];
    for (let i = 0; i < sudoku.size; i++) {
        const randomIndex = Math.floor(Math.random() * sudoku.size);
        const randomCell = sudoku.getCellIdsInSquare(i)[randomIndex];
        cells.push(randomCell);
    }
    return cells;
}

function removeLargestColumn(
    sudoku: Sudoku,
    network: Network,
    solution: number[][]
): void {
    const column = network.reduce<Node>((acc, c) => {
        if (!acc) return c;
        return acc.size > c.size ? acc : c;
    });

    const node = column?.find("down", (n) => {
        const row = sudoku.getRowIdOfNode(n);
        const column = sudoku.getColumnIdOfNode(n);
        const value = sudoku.getValueOfNode(n);

        return solution[row][column] === value;
    });

    if (node) {
        network.dispatch(NetworkEventType.Remove, node);
        network.currentSolutionState.push(node);
    }
}

function getNumFilledCells(sudoku: number[][]): number {
    let count = 0;
    for (let row of sudoku) {
        for (let value of row) {
            if (value !== 0) count++;
        }
    }
    return count;
}

function fillCells(
    sudoku: Sudoku,
    network: Network,
    solution: number[][],
    cells: number[]
): void {
    cells.forEach((cell) => {
        const row = sudoku.getRowId(cell);
        const column = sudoku.getColumnId(cell);
        const columnNode = network.find(
            (n) => sudoku.getCellIdOfNode(n) === cell,
            { maxColumn: sudoku.rowConstraint }
        );
        const node = columnNode?.find(
            "down",
            (n) => solution[row][column] === sudoku.getValueOfNode(n)
        );
        if (node) {
            network.dispatch(NetworkEventType.Remove, node);
            network.currentSolutionState.push(node);
        }
    });
}

Sudoku.generateComplete = function (size: number = 9): number[][] {
    const sudoku = new Sudoku(size);
    const network = sudoku.createNetwork();
    const initialCells = getInitialCells(sudoku);
    fillCellsRandomly(network, initialCells);
    const { solution: networkSolution } = network.solve();
    const solution = sudoku.convertNodesToSudoku(networkSolution);
    return solution;
};

function getInitialCells(sudoku: Sudoku): number[] {
    const cells = sudoku
        .getCellIdsInRow(0)
        .concat(sudoku.getCellIdsInColumn(0))
        .concat(sudoku.getCellIdsInSquare(0));
    return [...new Set(cells)];
}

function fillCellsRandomly(network: Network, cells: number[]): void {
    cells.forEach((cell) => {
        const columnNode = network.find((n) => n.columnId === cell);
        if (columnNode) {
            const randomTarget = Math.floor(Math.random() * columnNode.size);
            let count = 0;
            const targetNode = columnNode.find(
                "down",
                () => count++ === randomTarget
            );

            if (targetNode) {
                network.dispatch(NetworkEventType.Remove, targetNode);
                network.currentSolutionState.push(targetNode);
            }
        }
    });
}
