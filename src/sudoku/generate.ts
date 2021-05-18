import { Sudoku } from "./sudoku";
import Network from "../network";
import Node from "../node";
import "./network";
import "./solve";
import { Difficulty, GenerateResult } from "./types";

declare module "./sudoku" {
    namespace Sudoku {
        /**
         * Generates a Sudoku of the given size.
         * @param size The size of the Sudoku. Represented by the number of cells in each row, column, and square. 9 by default.
         * @returns {GenerateResult} An object with the Sudoku, solution, and difficulty of the puzzle.
         */
        export function generate(size?: number): Promise<GenerateResult>;

        /**
         * Generates a Sudoku of the given size.
         * @param size The size of the Sudoku. Represented by the number of cells in each row, column, and square. 9 by default.
         * @returns {GenerateResult} An object with the Sudoku, solution, and difficulty of the puzzle.
         */
        export function generateSync(size?: number): GenerateResult;

        /**
         * Generates a complete Sudoku solution of the given size.
         * @param size The size of the Sudoku. Represented by the number of cells in each row, column, and square. 9 by default.
         * @returns A Sudoku solution with the given size.
         */
        export function generateComplete(size?: number): Promise<number[][]>;

        /**
         * Generates a complete Sudoku solution of the given size.
         * @param size The size of the Sudoku. Represented by the number of cells in each row, column, and square. 9 by default.
         * @returns A Sudoku solution with the given size.
         */
        export function generateCompleteSync(size?: number): number[][];
    }
}

Sudoku.generate = async function (size: number = 9): Promise<GenerateResult> {
    const solution = await Sudoku.generateComplete(size);
    const sudoku = new Sudoku(size);
    const network = await sudoku.createNetwork();

    const initialCells = getInitialCellsToRemove(sudoku);
    await fillCells(sudoku, network, solution, initialCells);

    let hasMultipleSolutions = true;
    let nodesTried = 0;
    while (hasMultipleSolutions) {
        await removeLargestColumn(sudoku, network, solution);

        const result = await network.solve();
        hasMultipleSolutions = result.hasMultipleSolutions;

        if (!hasMultipleSolutions) {
            nodesTried = result.nodesTried;
        }
    }

    const generatedSudoku = sudoku.convertNodesToSudoku(
        network.currentSolutionState
    );

    return {
        sudoku: generatedSudoku,
        solution,
        difficulty: getDifficulty(nodesTried),
    };
};

Sudoku.generateSync = function (size: number = 9): GenerateResult {
    const solution = Sudoku.generateCompleteSync(size);
    const sudoku = new Sudoku(size);
    const network = sudoku.createNetworkSync();

    const initialCells = getInitialCellsToRemove(sudoku);
    fillCellsSync(sudoku, network, solution, initialCells);

    let hasMultipleSolutions = true;
    let nodesTried = 0;
    while (hasMultipleSolutions) {
        removeLargestColumnSync(sudoku, network, solution);

        const result = network.solveSync();
        hasMultipleSolutions = result.hasMultipleSolutions;

        if (!hasMultipleSolutions) {
            nodesTried = result.nodesTried;
        }
    }

    const generatedSudoku = sudoku.convertNodesToSudoku(
        network.currentSolutionState
    );

    return {
        sudoku: generatedSudoku,
        solution,
        difficulty: getDifficulty(nodesTried),
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

function getNodeInLargestColumnInSudoku(
    sudoku: Sudoku,
    network: Network,
    solution: number[][]
): Node {
    const column = network.reduce<Node>((acc, c) => {
        if (!acc) return c;
        return acc.size > c.size ? acc : c;
    });

    const node = column?.find("down", (n) => {
        const row = sudoku.getRowIdOfNode(n);
        const column = sudoku.getColumnIdOfNode(n);
        const value = sudoku.getValueOfNode(n);

        return solution[row][column] === value;
    })!;

    return node;
}

async function removeLargestColumn(
    sudoku: Sudoku,
    network: Network,
    solution: number[][]
): Promise<void> {
    const node = getNodeInLargestColumnInSudoku(sudoku, network, solution);
    await network.addNodeToSolution(node);
}

function removeLargestColumnSync(
    sudoku: Sudoku,
    network: Network,
    solution: number[][]
): void {
    const node = getNodeInLargestColumnInSudoku(sudoku, network, solution);
    network.addNodeToSolutionSync(node);
}

function getNodeMatchingCell(
    sudoku: Sudoku,
    network: Network,
    solution: number[][],
    cell: number
): Node | undefined {
    const row = sudoku.getRowId(cell);
    const column = sudoku.getColumnId(cell);
    const columnNode = network.find((n) => sudoku.getCellIdOfNode(n) === cell, {
        maxColumn: sudoku.rowConstraint,
    });
    return columnNode?.find(
        "down",
        (n) => solution[row][column] === sudoku.getValueOfNode(n)
    );
}

async function fillCells(
    sudoku: Sudoku,
    network: Network,
    solution: number[][],
    cells: number[]
): Promise<void> {
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const node = getNodeMatchingCell(sudoku, network, solution, cell);
        if (node) {
            network.addNodeToSolution(node);
        }
    }
}

function fillCellsSync(
    sudoku: Sudoku,
    network: Network,
    solution: number[][],
    cells: number[]
): void {
    cells.forEach((cell) => {
        const node = getNodeMatchingCell(sudoku, network, solution, cell);
        if (node) {
            network.addNodeToSolutionSync(node);
        }
    });
}

Sudoku.generateComplete = async function (
    size: number = 9
): Promise<number[][]> {
    const sudoku = new Sudoku(size);
    const network = await sudoku.createNetwork();
    const initialCells = getInitialCells(sudoku);
    await fillCellsRandomly(network, initialCells);
    const { solution: networkSolution } = await network.solve();
    const solution = sudoku.convertNodesToSudoku(networkSolution);
    return solution;
};

Sudoku.generateCompleteSync = function (size: number = 9): number[][] {
    const sudoku = new Sudoku(size);
    const network = sudoku.createNetworkSync();
    const initialCells = getInitialCells(sudoku);
    fillCellsRandomlySync(network, initialCells);
    const { solution: networkSolution } = network.solveSync();
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

function getRandomNodeInCell(network: Network, cell: number): Node | undefined {
    const columnNode = network.find((n) => n.columnId === cell);
    if (!columnNode) return;
    const randomTarget = Math.floor(Math.random() * columnNode.size);
    let count = 0;
    return columnNode.find("down", () => count++ === randomTarget);
}

async function fillCellsRandomly(
    network: Network,
    cells: number[]
): Promise<void> {
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const node = getRandomNodeInCell(network, cell);
        if (node) {
            network.addNodeToSolution(node);
        }
    }
}

function fillCellsRandomlySync(network: Network, cells: number[]): void {
    cells.forEach((cell) => {
        const node = getRandomNodeInCell(network, cell);
        if (node) {
            network.addNodeToSolutionSync(node);
        }
    });
}

function getDifficulty(nodesTried: number): Difficulty {
    if (nodesTried < 50) return "easy";
    else if (nodesTried < 55) return "medium";
    else if (nodesTried < 70) return "hard";
    else return "expert";
}
