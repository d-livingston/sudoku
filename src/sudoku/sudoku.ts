import { Direction } from "../directions";
import { House } from "./types";

export class InvalidSizeError extends Error {}
InvalidSizeError.prototype.name = "InvalidSizeError";
InvalidSizeError.prototype.message = "Not a valid Sudoku size.";

export class InvalidSudokuError extends Error {}
InvalidSudokuError.prototype.name = "InvalidSudokuError";
InvalidSudokuError.prototype.message = "Not a valid Sudoku puzzle.";

/**
 * A class representing a Sudoku puzzle.
 */
export class Sudoku {
    public static readonly DEFAULT_SIZE: number = 9;
    public readonly sudoku: number[][] = [];
    public readonly initial: number[][] = [];
    public readonly size: number;
    public readonly sqrt: number;
    public readonly rowConstraint: number;
    public readonly columnConstraint: number;
    public readonly squareConstraint: number;
    public readonly rowsInNetwork: number;
    public readonly columnsInNetwork: number;

    /**
     * Determines if the Sudoku board is complete. A Sudoku board is complete if every cell is filled and the Sudoku is valid.
     * @param sudoku An nxn matrix representing the Sudoku puzzle.
     * @returns True if the board is complete; false otherwise.
     */
    public static isComplete(sudoku: number[][]): boolean {
        try {
            const board = new Sudoku(sudoku);
            return board.isComplete();
        } catch {
            return false;
        }
    }

    /**
     * Determines if the Sudoku board is valid.
     * @param sudoku An nxn matrix representing the Sudoku puzzle.
     * @returns True if the board is valid; false otherwise.
     */
    public static isValid(sudoku: number[][]): boolean {
        try {
            new Sudoku(sudoku);
        } catch {
            return false;
        }

        return true;
    }

    /**
     * Determines if the Sudoku board has the correct dimensions.
     * @param sudoku An nxn matrix representing the Sudoku puzzle.
     * @returns True if the board is valid; false otherwise.
     */
    public static isValidBoard(sudoku: number[][]): boolean {
        const size = sudoku.length;
        if (!Sudoku.isValidSize(size)) return false;
        for (let row of sudoku) {
            if (row.length !== size) return false;
        }
        return true;
    }

    /**
     * Determines if a Sudoku size is valid or not.
     * @param size The size of the Sudoku. Represented by the number of cells in each row, column, and square.
     * @returns True if the size is valid; false otherwise.
     */
    public static isValidSize(size: number): boolean {
        return (
            size > 0 &&
            Number.isInteger(size) &&
            Number.isInteger(Math.sqrt(size))
        );
    }

    /**
     * Generates a blank Sudoku of the given size.
     * @param size The size of the Sudoku. Represented by the number of cells in each row, column, and square.
     * @returns A blank Sudoku with the given size.
     */
    public static generateBlank(
        size: number = Sudoku.DEFAULT_SIZE
    ): number[][] {
        if (!Sudoku.isValidSize(size)) return [];

        return Array.from({ length: size }, () =>
            Array.from({ length: size }, () => 0)
        );
    }

    /**
     * Constructs a Sudoku object with the given size or the given Sudoku puzzle.
     * @param initValue Either a number representing the size of the board or an nxn matrix representing the puzzle.
     */
    constructor(initValue: number | number[][]) {
        if (typeof initValue === "number") {
            if (!Sudoku.isValidSize(initValue)) throw new InvalidSizeError();
            this.size = initValue;
            this.sudoku = Sudoku.generateBlank(this.size);
            this.initial = Sudoku.generateBlank(this.size);
        } else {
            if (!Sudoku.isValidBoard(initValue)) throw new InvalidSizeError();
            this.size = initValue.length;
            this.sudoku = Array.from({ length: this.size }, (_, row) =>
                Array.from(
                    { length: this.size },
                    (_, column) => initValue[row][column]
                )
            );
            this.initial = Array.from({ length: this.size }, (_, row) =>
                Array.from(
                    { length: this.size },
                    (_, column) => initValue[row][column]
                )
            );
        }

        this.sqrt = Math.sqrt(this.size);
        this.rowConstraint = this.size * this.size;
        this.columnConstraint = this.rowConstraint * 2;
        this.squareConstraint = this.rowConstraint * 3;
        this.columnsInNetwork = this.rowConstraint * 4;
        this.rowsInNetwork = this.rowConstraint * this.size;
        if (!this.isValid()) throw new InvalidSudokuError();
    }

    /**
     * Gets the cell ID of the cell in the given row and column.
     * @param row The row ID of the cell.
     * @param column The column ID of the cell.
     * @returns The cell ID. If the row and/or column are invalid, returns -1.
     */
    public getCellId(row: number, column: number): number {
        return this.isValidHouseId(row) && this.isValidHouseId(column)
            ? row * this.size + column
            : -1;
    }

    /**
     * Gets the cell ID of the cell next to the given cell in the given direction.
     * @param cell The cell ID.
     * @param direction The direction to move to.
     * @returns The next cell in the given direction from a cell ID.
     */
    public getCellIdInDirection(cell: number, direction: Direction): number {
        if (!this.isValidCellId(cell)) return -1;

        const row = this.getRowId(cell);
        const column = this.getColumnId(cell);

        switch (direction) {
            case "left": {
                return column === 0
                    ? this.getCellId(row, this.size - 1)
                    : this.getCellId(row, column - 1);
            }
            case "right": {
                return column === this.size - 1
                    ? this.getCellId(row, 0)
                    : this.getCellId(row, column + 1);
            }
            case "up": {
                return row === 0
                    ? this.getCellId(this.size - 1, column)
                    : this.getCellId(row - 1, column);
            }
            case "down": {
                return row === this.size - 1
                    ? this.getCellId(0, column)
                    : this.getCellId(row + 1, column);
            }
            default: {
                throw new Error("Invalid direction provided.");
            }
        }
    }

    /**
     * Gets the cell's info.
     * @param cell The cell ID.
     * @returns The info of the cell.
     */
    public getCellInfo(cell: number) {
        return {
            cell,
            row: this.getRowId(cell),
            column: this.getColumnId(cell),
            square: this.getSquareId(cell),
            value: this.getValue(cell),
        };
    }

    /**
     * Gets the row ID of the given cell.
     * @param cell The cell ID.
     * @returns The row ID of the cell. If the cell is valid, returns -1.
     */
    public getRowId(cell: number): number {
        return this.isValidCellId(cell) ? Math.floor(cell / this.size) : -1;
    }

    /**
     * Gets the column ID of the given cell.
     * @param cell The cell ID.
     * @returns The column ID of the cell. If the cell is invalid, returns -1.
     */
    public getColumnId(cell: number): number {
        return this.isValidCellId(cell) ? cell % this.size : -1;
    }

    /**
     * Gets the square ID of the given cell.
     * @param cell The cell ID.
     * @returns The square ID of the cell. If the cell is invalid, returns -1.
     */
    public getSquareId(cell: number): number {
        const row = this.getRowId(cell);
        const column = this.getColumnId(cell);
        return row !== -1 && column !== -1
            ? Math.floor(row / this.sqrt) * this.sqrt +
                  Math.floor(column / this.sqrt)
            : -1;
    }

    /**
     * Gets the value in the given cell.
     * @param cell The cell ID.
     * @returns The value in the cell. If the cell is invalid, returns -1. If the cell is empty, returns 0.
     */
    public getValue(cell: number): number {
        if (!this.isValidCellId(cell)) return -1;
        return this.sudoku[this.getRowId(cell)][this.getColumnId(cell)];
    }

    /**
     * Sets the value of the given cell if it can be changed.
     * @param cell The cell ID.
     * @param value The desired value to change the cell to.
     */
    public setValue(cell: number, value: number): void {
        if (!this.isValidCellId(cell)) return;
        if (!this.isValidValue(value)) return;
        if (this.isLocked(cell)) return;

        this.sudoku[this.getRowId(cell)][this.getColumnId(cell)] = value;
    }

    /**
     * Determines if the cell is locked and cannot have its value changed.
     * @param cell The cell ID.
     * @returns True if the cell is locked; false otherwise.
     */
    public isLocked(cell: number): boolean {
        const row = this.getRowId(cell);
        const column = this.getColumnId(cell);

        return this.initial[row][column] !== 0;
    }

    /**
     * Gets the house IDs of the given cell.
     * @param cell The cell ID.
     * @returns An object containing the row ID, column ID, and square ID of the cell.
     */
    public getHouseIdsOfCell(cell: number) {
        const isValid = this.isValidCellId(cell);
        return {
            row: isValid ? this.getRowId(cell) : -1,
            column: isValid ? this.getColumnId(cell) : -1,
            square: isValid ? this.getSquareId(cell) : -1,
        };
    }

    /**
     * Gets the cell IDs in the current Sudoku.
     * @returns The cell IDs in the current Sudoku.
     */
    public getCellIds(): number[] {
        return Array.from({ length: this.rowConstraint }, (_, i) => i);
    }

    /**
     * Gets the house IDs in the current Sudoku.
     * @returns The house IDs in the given Sudoku.
     */
    public getHouseIds(): number[] {
        return Array.from({ length: this.size }, (_, i) => i);
    }

    /**
     * Gets the cell IDs in the given row.
     * @param row The row ID.
     * @returns The cell IDs in the given row. If the row ID is invalid, returns an empty array.
     */
    public getCellIdsInRow(row: number): number[] {
        const firstId = row * this.size;
        return this.isValidHouseId(row)
            ? Array.from({ length: this.size }, (_, i) => i + firstId)
            : [];
    }

    /**
     * Gets the cell IDs in the given column.
     * @param column The column ID.
     * @returns The cell IDs in the given column. If the row ID is invalid, returns an empty array.
     */
    public getCellIdsInColumn(column: number): number[] {
        return this.isValidHouseId(column)
            ? Array.from(
                  { length: this.size },
                  (_, i) => i * this.size + column
              )
            : [];
    }

    /**
     * Gets the cell IDs in the given square.
     * @param square The square ID.
     * @returns The cell IDs in the given square. If the row ID is invalid, returns an empty array.
     */
    public getCellIdsInSquare(square: number): number[] {
        if (this.isValidHouseId(square)) {
            const firstId =
                Math.floor(square / this.sqrt) * this.sqrt * this.size +
                (square % this.sqrt) * this.sqrt;
            return Array.from(
                { length: this.size },
                (_, i) =>
                    firstId +
                    (i % this.sqrt) +
                    Math.floor(i / this.sqrt) * this.size
            );
        } else return [];
    }

    /**
     * Determines if the given house ID is valid for this Sudoku.
     * @param houseId The ID of the house. The house could be a row, column, or square.
     * @returns True if the ID is valid; false otherwise.
     */
    public isValidHouseId(houseId: number): boolean {
        return houseId >= 0 && houseId < this.size && Number.isInteger(houseId);
    }

    /**
     * Determines if the given cell ID is valid for this Sudoku.
     * @param cellId The ID of the cell.
     * @returns True if the ID is valid; false otherwise.
     */
    public isValidCellId(cellId: number): boolean {
        return (
            cellId >= 0 &&
            cellId < this.rowConstraint &&
            Number.isInteger(cellId)
        );
    }

    /**
     * Determines if the given value is valid for this Sudoku.
     * @param value The value written inside a cell.
     * @returns True if the value is valid; false otherwise.
     */
    public isValidValue(value: number): boolean {
        return value >= 0 && value <= this.size && Number.isInteger(value);
    }

    /**
     * Determines if the current Sudoku is complete or not. A Sudoku is complete if every cell is filled and the Sudoku is valid.
     * @returns True if the Sudoku is complete; false otherwise.
     */
    public isComplete(): boolean {
        if (!this.isValid()) return false;
        for (let row of this.sudoku) {
            for (let value of row) {
                if (value === 0) return false;
            }
        }
        return true;
    }

    /**
     * Determines if the current Sudoku is valid or not. A Sudoku is valid if there are no repeated values in any given house.
     * @returns True if the Sudoku is valid; false otherwise.
     */
    public isValid(): boolean {
        // Already assumed to be a valid board.
        for (let i = 0; i < this.size; i++) {
            if (!this.isValidHouse("row", i)) return false;
        }
        for (let i = 0; i < this.size; i++) {
            if (!this.isValidHouse("column", i)) return false;
        }
        for (let i = 0; i < this.size; i++) {
            if (!this.isValidHouse("square", i)) return false;
        }

        return true;
    }

    /**
     * Determines if the given house is valid for this Sudoku.
     * @param type The type of house. Can either be 'row', 'column', or 'square'.
     * @param id The ID of the house.
     * @returns True if the house is valid; false otherwise.
     */
    public isValidHouse(type: House, id: number): boolean {
        let values: number[] = [];
        switch (type) {
            case "row": {
                values = this.getCellIdsInRow(id).map((cell) =>
                    this.getValue(cell)
                );
                break;
            }
            case "column": {
                values = this.getCellIdsInColumn(id).map((cell) =>
                    this.getValue(cell)
                );
                break;
            }
            case "square": {
                values = this.getCellIdsInSquare(id).map((cell) =>
                    this.getValue(cell)
                );
                break;
            }
            default: {
                return false;
            }
        }

        const used = new Set<number>();
        for (let value of values) {
            if (value === 0) continue;
            else if (!this.isValidValue(value)) return false;
            else if (used.has(value)) return false;
            else used.add(value);
        }
        return true;
    }
}
