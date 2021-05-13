export class InvalidSizeError extends Error {}
InvalidSizeError.prototype.name = "InvalidSizeError";
InvalidSizeError.prototype.message = "Not a valid Sudoku size.";

/**
 * A class representing a Sudoku puzzle.
 */
export class Sudoku {
    public static readonly DEFAULT_SIZE: number = 9;
    public readonly sudoku: number[][] = [];
    public readonly size: number;
    public readonly sqrt: number;
    public readonly rowConstraint: number;
    public readonly columnConstraint: number;
    public readonly squareConstraint: number;
    public readonly rowsInNetwork: number;
    public readonly columnsInNetwork: number;

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

    constructor(size: number) {
        if (!Sudoku.isValidSize(size)) throw new InvalidSizeError();

        this.size = size;
        this.sqrt = Math.sqrt(size);
        this.rowConstraint = size * size;
        this.columnConstraint = this.rowConstraint * 2;
        this.squareConstraint = this.rowConstraint * 3;
        this.columnsInNetwork = this.rowConstraint * 4;
        this.rowsInNetwork = this.rowConstraint * size;
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
        return value >= 1 && value <= this.size && Number.isInteger(value);
    }
}
