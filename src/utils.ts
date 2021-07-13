import { flatten } from "lodash";

export function isSolvedSudoku(sudoku: number[][]): boolean {
    if (!isValidSudoku(sudoku)) return false;
    return sudoku.every((row) => row.every((value) => value !== 0));
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
