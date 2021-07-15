import { flatten } from "lodash";

export function isSolvedSudoku(sudoku: number[][]): boolean {
    if (!sudoku.every((row) => row.every((value) => value !== 0))) return false;
    return isValidSudoku(sudoku);
}

export function isValidSudoku(sudoku: number[][]): boolean {
    if (!isValidSudokuShape(sudoku)) return false;
    for (let i = 0; i < sudoku.length; i++) {
        if (!isValidSudokuHouse(copyRow(sudoku, i))) return false;
        if (!isValidSudokuHouse(copyColumn(sudoku, i))) return false;
        if (!isValidSudokuHouse(copySquare(sudoku, i))) return false;
    }
    return true;
}

function isValidSudokuHouse(house: number[]): boolean {
    const usedValues: Set<number> = new Set();
    return house.every((value) => {
        if (usedValues.has(value)) return false;
        if (value !== 0) usedValues.add(value);
        return true;
    });
}

function isValidSudokuShape(sudoku: number[][]): boolean {
    const size = sudoku.length;
    if (!isValidSudokuSize(size)) return false;
    return sudoku.every((row) => row.length === size);
}

function isValidSudokuSize(size: number): boolean {
    return (
        size > 0 && Number.isInteger(size) && Number.isInteger(Math.sqrt(size))
    );
}

export function copySudoku(sudoku: number[][]): number[][] {
    return sudoku.map((row) => row.map((value) => value));
}

export function copyRow(sudoku: number[][], row: number): number[] {
    return [...sudoku[row]];
}

export function copyColumn(sudoku: number[][], column: number): number[] {
    return sudoku.map((row) => row[column]);
}

export function copySquare(sudoku: number[][], square: number): number[] {
    const sqrt = Math.sqrt(sudoku.length);
    const rowMin = Math.floor(square / sqrt) * sqrt;
    const rowMax = rowMin + sqrt;
    const columnMin = (square % sqrt) * sqrt;
    const columnMax = columnMin + sqrt;

    return flatten(
        sudoku.map((row, rowIndex) => {
            if (rowIndex < rowMin || rowIndex >= rowMax) return [];
            else
                return row.filter(
                    (_, columnIndex) =>
                        columnIndex >= columnMin && columnIndex < columnMax
                );
        })
    );
}

export function getCell(size: number, row: number, column: number): number {
    return row * size + column;
}

export function getRow(size: number, cell: number): number {
    return Math.floor(cell / size);
}

export function getColumn(size: number, cell: number): number {
    return cell % size;
}

export function getSquare(size: number, cell: number): number {
    const sqrt = Math.sqrt(size);
    const row = getRow(size, cell);
    const column = getColumn(size, cell);
    return Math.floor(row / sqrt) * sqrt + Math.floor(column / sqrt);
}

export function getRowCells(size: number, row: number): number[] {
    const firstId = row * size;
    return Array.from({ length: size }, (_, i) => i + firstId);
}

export function getColumnCells(size: number, column: number): number[] {
    return Array.from({ length: size }, (_, i) => i * size + column);
}

export function getSquareCells(sudoku: number[][], square: number): number[] {
    const sqrt = Math.sqrt(sudoku.length);
    const rowMin = Math.floor(square / sqrt) * sqrt;
    const rowMax = rowMin + sqrt;
    const columnMin = (square % sqrt) * sqrt;
    const columnMax = columnMin + sqrt;

    return flatten(
        sudoku.map((row, rowIndex) => {
            if (rowIndex < rowMin || rowIndex >= rowMax) return [];
            else
                return row
                    .map((_, columnIndex) =>
                        getCell(sudoku.length, rowIndex, columnIndex)
                    )
                    .filter(
                        (_, columnIndex) =>
                            columnIndex >= columnMin && columnIndex < columnMax
                    );
        })
    );
}

export function getValue(sudoku: number[][], cell: number): number {
    return sudoku[getRow(sudoku.length, cell)][getColumn(sudoku.length, cell)];
}

export function getInvalidCells(sudoku: number[][]): Set<number> {
    const size = sudoku.length;
    let invalidCells = new Set<number>();
    if (isValidSudoku(sudoku)) return invalidCells;

    for (let i = 0; i < size; i++) {
        invalidCells = union(
            invalidCells,
            getInvalidCellsInHouse(sudoku, getRowCells(size, i))
        );
        invalidCells = union(
            invalidCells,
            getInvalidCellsInHouse(sudoku, getColumnCells(size, i))
        );
        invalidCells = union(
            invalidCells,
            getInvalidCellsInHouse(sudoku, getSquareCells(sudoku, i))
        );
    }
    return invalidCells;
}

function getInvalidCellsInHouse(
    sudoku: number[][],
    cells: number[]
): Set<number> {
    const invalidCells = new Set<number>();

    const values = cells.map((cell) => getValue(sudoku, cell));
    first: for (let i = 0; i < values.length; i++) {
        if (values[i] === 0) continue first;
        second: for (let j = i + 1; j < values.length; j++) {
            if (values[j] === 0) continue second;

            if (values[i] === values[j]) {
                invalidCells.add(cells[i]);
                invalidCells.add(cells[j]);
            }
        }
    }
    return invalidCells;
}

function union<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    const u = new Set<T>(set1);
    for (let element of set2) {
        u.add(element);
    }
    return u;
}
