import { shuffle } from "lodash";
import solve from "./solve";

const defaultSize = 9;

export type GenerateResult = {
    sudoku: number[][];
    solution: number[][];
};

export function generate(options: { verbose: true }): GenerateResult;
export function generate(options?: { verbose: false }): number[][];
export function generate(options?: {
    verbose: boolean;
}): number[][] | GenerateResult {
    const size = defaultSize;
    const solution = buildCompleteSudoku(size);
    const removedCells = removeAll(solution);
    const sudoku = buildSudoku(size, removedCells);
    if (options?.verbose) {
        return {
            sudoku,
            solution,
        };
    } else return sudoku;
}

// Builds a complete sudoku randomly by filling the top left square, the topmost row and the leftmost column and then solving
function buildCompleteSudoku(size: number = defaultSize): number[][] {
    const sqrt = Math.sqrt(size);
    const sudoku = buildBlankSudoku(size);
    fillSquare(sudoku, size, sqrt);
    fillRow(sudoku, size, sqrt);
    fillColumn(sudoku, size, sqrt);
    return solve(sudoku).solution;
}

function fillSquare(sudoku: number[][], size: number, sqrt: number): void {
    const shuffledValues = shuffle(getPossibleValues(size));
    for (let i = 0; i < sqrt; i++) {
        for (let j = 0; j < sqrt; j++) {
            sudoku[i][j] = shuffledValues[i * sqrt + j];
        }
    }
}

function fillRow(sudoku: number[][], size: number, sqrt: number): void {
    const shuffledValues = shuffle(getPossibleValues(size));
    const usedInRow = getUsedInRow(sudoku, sqrt);
    let sudokuIndex: number = sqrt,
        valuesIndex: number = 0;
    while (sudokuIndex < size) {
        if (usedInRow.has(shuffledValues[valuesIndex])) valuesIndex++;
        else sudoku[0][sudokuIndex++] = shuffledValues[valuesIndex++];
    }
}

function fillColumn(sudoku: number[][], size: number, sqrt: number): void {
    const shuffledValues = shuffle(getPossibleValues(size));
    const usedInColumn = getUsedInColumn(sudoku, sqrt);
    let sudokuIndex: number = sqrt,
        valuesIndex: number = 0;
    while (sudokuIndex < size) {
        if (usedInColumn.has(shuffledValues[valuesIndex])) valuesIndex++;
        else sudoku[sudokuIndex++][0] = shuffledValues[valuesIndex++];
    }
}

function buildBlankSudoku(size: number): number[][] {
    return Array.from({ length: size }, () =>
        Array.from({ length: size }, () => 0)
    );
}

function getPossibleValues(size: number): number[] {
    return Array.from({ length: size }, (_, i) => i + 1);
}

function getUsedInRow(sudoku: number[][], sqrt: number): Set<number> {
    const usedInRow: Set<number> = new Set();
    for (let i = 0; i < sqrt; i++) {
        usedInRow.add(sudoku[0][i]);
    }
    return usedInRow;
}

function getUsedInColumn(sudoku: number[][], sqrt: number): Set<number> {
    const usedInColumn: Set<number> = new Set();
    for (let i = 0; i < sqrt; i++) {
        usedInColumn.add(sudoku[i][0]);
    }
    return usedInColumn;
}

function removeAll(sudoku: number[][]): Array<{ cell: number; value: number }> {
    const size = sudoku.length;
    const shuffledCells = shuffle(getPossibleCells(size));
    const removedCells: Array<{ cell: number; value: number }> = [];
    while (shuffledCells.length > 0) {
        const cell = shuffledCells.pop()!;
        const row = getRow(size, cell);
        const column = getColumn(size, cell);
        removedCells.push({
            cell,
            value: sudoku[row][column],
        });
    }
    return removedCells;
}

function getRow(size: number, cell: number): number {
    return Math.floor(cell / size);
}

function getColumn(size: number, cell: number): number {
    return cell % size;
}

function getPossibleCells(size: number): number[] {
    return Array.from({ length: size * size }, (_, i) => i);
}

function buildSudoku(
    size: number,
    removedCells: Array<{ cell: number; value: number }>
): number[][] {
    const sudoku = buildBlankSudoku(size);
    const initialCells = size * 2;
    for (let i = 0; i < initialCells; i++) {
        const { cell, value } = removedCells.pop()!;
        putBackValue(sudoku, size, cell, value);
    }

    while (!solve(sudoku).unique) {
        const { cell, value } = removedCells.pop()!;
        putBackValue(sudoku, size, cell, value);
    }

    return sudoku;
}

function putBackValue(
    sudoku: number[][],
    size: number,
    cell: number,
    value: number
): void {
    const row = getRow(size, cell);
    const column = getColumn(size, cell);
    sudoku[row][column] = value;
}
