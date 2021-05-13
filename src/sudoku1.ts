import Node from "./node1";
import Network from "./network1";
import NetworkSolver from "./network-solver";

/**
 * Handles all Sudoku-related operations.
 */
export default class Sudoku {
    public readonly sqrt: number;
    public readonly rowConstraint: number;
    public readonly columnConstraint: number;
    public readonly squareConstraint: number;
    public readonly rowsInNetwork: number;
    public readonly columnsInNetwork: number;
    private readonly solver: NetworkSolver;

    constructor(public readonly size: number) {
        if (!this.isValidSudokuSize(size))
            throw new Error("Not a valid Sudoku size.");

        this.sqrt = Math.sqrt(size);
        this.rowConstraint = size * size;
        this.columnConstraint = this.rowConstraint * 2;
        this.squareConstraint = this.rowConstraint * 3;
        this.columnsInNetwork = this.rowConstraint * 4;
        this.rowsInNetwork = this.rowConstraint * size;

        this.solver = new NetworkSolver(
            new Network(
                this.rowsInNetwork,
                this.columnsInNetwork,
                this.isNodeInNetwork.bind(this)
            )
        );
    }

    // TODO: FINISH JSDOC

    /**
     * Generates a Sudoku randomly.
     * @returns
     */
    public generate() {
        const solution = this.generateCompleteSudoku();
        const sudoku = this.generateFromComplete(solution);
        this.solver.reset();
        return { sudoku, solution };
    }

    /**
     * Solves a Sudoku board, for multiple solutions, if necessary.
     * @param sudoku A matrix of numbers representing a Sudoku board.
     * @returns An array of solutions of the given Sudoku problem.
     */
    public solve(sudoku: number[][]): number[][][] {
        if (!this.isValidSudoku(sudoku)) return [];

        this.addNodesMatchingSudokuToSolution(sudoku);
        const networkSolutions = this.solver.solve();
        const solutions = networkSolutions.map((networkSolution) =>
            this.getSudokuFromNetworkSolution(networkSolution)
        );

        this.solver.reset();
        return solutions;
    }

    /**
     * Determines if a Sudoku board is valid.
     * @param sudoku A matrix of numbers representing a Sudoku board.
     * @returns True if the given matrix represents a valid Sudoku board; false otherwise.
     */
    public isValidSudoku(sudoku: number[][]): boolean {
        if (sudoku.length !== this.size) return false;
        if (sudoku.some((row) => row.length !== this.size)) return false;

        for (let i = 0; i < this.size; i++) {
            const valuesInRow = this.getValuesInHouse(
                sudoku,
                this.getCellIdsInRow(i)
            );
            if (!this.isValidHouse(valuesInRow)) return false;
        }

        for (let i = 0; i < this.size; i++) {
            const valuesInColumn = this.getValuesInHouse(
                sudoku,
                this.getCellIdsInColumn(i)
            );
            if (!this.isValidHouse(valuesInColumn)) return false;
        }

        for (let i = 0; i < this.size; i++) {
            const valuesInSquare = this.getValuesInHouse(
                sudoku,
                this.getCellIdsInSquare(i)
            );
            if (!this.isValidHouse(valuesInSquare)) return false;
        }

        return true;
    }

    /**
     * Determines if a Sudoku board is complete.
     * @param sudoku A matrix of numbers representing a Sudoku board.
     * @returns True if the given matrix represents a complete Sudoku board; false otherwise.
     */
    public isCompleteSudoku(sudoku: number[][]): boolean {
        if (!this.isValidSudoku(sudoku)) return false;

        for (let row of sudoku) {
            if (!row.every((value) => value !== 0)) return false;
        }
        return true;
    }

    /**
     * Gets the cell ID of the cell in the given row and column.
     * @param row The row ID of the cell.
     * @param column The column ID of the cell.
     * @returns The cell ID.
     */
    public getCellId(row: number, column: number): number {
        return this.isValidHouseId(row) && this.isValidHouseId(column)
            ? this._getCellId(row, column)
            : -1;
    }

    /**
     * Gets the row ID of the given cell.
     * @param cell The cell ID.
     * @returns The row ID of the cell.
     */
    public getRowId(cell: number): number {
        return this.isValidCellId(cell) ? this._getRowId(cell) : -1;
    }

    /**
     * Gets the column ID of the given cell.
     * @param cell The cell ID.
     * @returns The column ID of the cell.
     */
    public getColumnId(cell: number): number {
        return this.isValidCellId(cell) ? this._getColumnId(cell) : -1;
    }

    /**
     * Gets the square ID of the given cell.
     * @param cell The cell ID.
     * @returns The square ID of the cell.
     */
    public getSquareId(cell: number): number {
        return this.isValidCellId(cell) ? this._getSquareId(cell) : -1;
    }

    /**
     * Gets the house IDs of the given cell.
     * @param cell The cell ID.
     * @returns An object containing the row ID, column ID, and square ID of the cell.
     */
    public getHouseIdsOfCell(cell: number) {
        const isValid = this.isValidCellId(cell);
        return {
            row: isValid ? this._getRowId(cell) : -1,
            column: isValid ? this._getColumnId(cell) : -1,
            square: isValid ? this._getSquareId(cell) : -1,
        };
    }

    /**
     * Gets the cell IDs in the given row.
     * @param row The row ID.
     * @returns The cell IDs in the given row.
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
     * @returns The cell IDs in the given column.
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
     * @returns The cell IDs in the given square.
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
     * Gets the Sudoku row ID of the network node.
     * @param node A node in the network.
     * @returns The row ID of the node if applicable; otherwise -1.
     */
    public getRowIdOfNode(node: Node): number {
        return node.isColumn
            ? this._getRowIdOfColumnNode(node)
            : this._getRowIdOfRowNode(node);
    }

    /**
     * Gets the Sudoku column ID of the network node.
     * @param node A node in the network.
     * @returns The column ID of the node if applicable; otherwise -1.
     */
    public getColumnIdOfNode(node: Node): number {
        return node.isColumn
            ? this._getColumnIdOfColumnNode(node)
            : this._getColumnIdOfRowNode(node);
    }

    /**
     * Gets the Sudoku square ID of the network node.
     * @param node A node in the network.
     * @returns The square ID of the node if applicable; otherwise -1.
     */
    public getSquareIdOfNode(node: Node): number {
        return node.isColumn
            ? this._getSquareIdOfColumnNode(node)
            : this._getSquareIdOfRowNode(node);
    }

    /**
     * Gets the Sudoku cell ID of the network node.
     * @param node A node in the network.
     * @returns The cell ID of the node if applicable; otherwise -1.
     */
    public getCellIdOfNode(node: Node): number {
        return node.isColumn
            ? this._getCellIdOfColumnNode(node)
            : this._getCellIdOfRowNode(node);
    }

    /**
     * Gets the Sudoku value of the network node.
     * @param node A node in the network.
     * @returns The value of the node if applicable; otherwise -1.
     */
    public getValueOfNode(node: Node): number {
        return node.isColumn
            ? this._getValueOfColumnNode(node)
            : this._getValueOfRowNode(node);
    }

    /**
     * Determines if the given row ID and column ID of a node corresponds to a node in the Sudoku network.
     * @param row The row ID of the node in the network.
     * @param column The column ID of the node in the network.
     * @returns True if the node should be in the network; false otherwise.
     */
    public isNodeInNetwork(row: number, column: number): boolean {
        if (column < this.rowConstraint)
            return this.isNodeInFirstQuadrant(row, column);
        else if (column < this.columnConstraint)
            return this.isNodeInSecondQuadrant(row, column);
        else if (column < this.squareConstraint)
            return this.isNodeInThirdQuadrant(row, column);
        else return this.isNodeInFourthQuadrant(row, column);
    }

    private createEmptySudoku(): number[][] {
        return Array.from({ length: this.size }, () =>
            Array.from({ length: this.size }, () => 0)
        );
    }

    private getValuesInHouse(
        sudoku: number[][],
        cellsInHouse: number[]
    ): number[] {
        return cellsInHouse.map((cell) => {
            const row = this._getRowId(cell);
            const column = this._getColumnId(cell);
            return sudoku[row][column];
        });
    }

    private isValidHouse(house: number[]): boolean {
        if (house.length !== this.size) return false;
        const used = new Set<number>();
        for (let value of house) {
            if (value === 0) continue;
            else if (!this.isValidValue(value)) return false;
            else if (used.has(value)) return false;
            else used.add(value);
        }
        return true;
    }

    private isValidSudokuSize(size: number): boolean {
        return Number.isInteger(size) && Number.isInteger(Math.sqrt(size));
    }

    private isValidCellId(cell: number): boolean {
        return cell >= 0 && cell < this.rowConstraint && Number.isInteger(cell);
    }

    private isValidHouseId(house: number): boolean {
        return house >= 0 && house < this.size && Number.isInteger(house);
    }

    private isValidValue(value: number): boolean {
        return value >= 1 && value <= this.size && Number.isInteger(value);
    }

    private _getCellId(row: number, column: number): number {
        return row * this.size + column;
    }

    private _getRowId(cell: number): number {
        return Math.floor(cell / this.size);
    }

    private _getColumnId(cell: number): number {
        return cell % this.size;
    }

    private _getSquareId(cell: number): number {
        return (
            Math.floor(this._getRowId(cell) / this.sqrt) * this.sqrt +
            Math.floor(this._getColumnId(cell) / this.sqrt)
        );
    }

    private _getRowIdOfRowNode({ rowId }: Node): number {
        return Math.floor(rowId / this.rowConstraint);
    }

    private _getRowIdOfColumnNode({ columnId }: Node): number {
        if (columnId < this.rowConstraint) return this._getRowId(columnId);
        else if (columnId < this.columnConstraint)
            return Math.floor((columnId - this.rowConstraint) / this.size);
        else return -1;
    }

    private _getColumnIdOfRowNode({ rowId }: Node): number {
        return Math.floor(rowId / this.size) % this.size;
    }

    private _getColumnIdOfColumnNode({ columnId }: Node): number {
        if (columnId < this.rowConstraint) return this._getColumnId(columnId);
        else if (
            columnId >= this.columnConstraint &&
            columnId < this.squareConstraint
        ) {
            return Math.floor((columnId - this.columnConstraint) / this.size);
        } else return -1;
    }

    private _getSquareIdOfRowNode(node: Node): number {
        const cell = this._getCellIdOfRowNode(node);
        return this._getSquareId(cell);
    }

    private _getSquareIdOfColumnNode({ columnId }: Node): number {
        if (columnId < this.rowConstraint) return this._getSquareId(columnId);
        else if (columnId >= this.squareConstraint)
            return Math.floor((columnId - this.squareConstraint) / this.size);
        else return -1;
    }

    private _getCellIdOfRowNode(node: Node): number {
        const row = this._getRowIdOfRowNode(node);
        const column = this._getColumnIdOfRowNode(node);
        return this._getCellId(row, column);
    }

    private _getCellIdOfColumnNode({ columnId }: Node): number {
        if (columnId < this.rowConstraint) return columnId;
        else return -1;
    }

    private _getValueOfRowNode({ rowId }: Node): number {
        return (rowId % this.size) + 1;
    }

    private _getValueOfColumnNode({ columnId }: Node): number {
        if (columnId >= this.rowConstraint) return (columnId % this.size) + 1;
        else return -1;
    }

    private isNodeInFirstQuadrant(row: number, column: number): boolean {
        return column === Math.floor(row / this.size);
    }

    private isNodeInSecondQuadrant(row: number, column: number): boolean {
        return (
            column - this.rowConstraint ===
            Math.floor(row / this.rowConstraint) * this.size + (row % this.size)
        );
    }

    private isNodeInThirdQuadrant(row: number, column: number) {
        return column - this.columnConstraint === row % this.rowConstraint;
    }

    private isNodeInFourthQuadrant(row: number, column: number) {
        return (
            column - this.squareConstraint ===
            Math.floor(row / this.squareConstraint) * this.sqrt * this.size +
                (Math.floor(row / (this.sqrt * this.size)) % this.sqrt) *
                    this.size +
                (row % this.size)
        );
    }

    private addNodesMatchingSudokuToSolution(sudoku: number[][]) {
        const nodesMatchingSudoku = this.solver.network.filter(
            (n: Node) => {
                const row = this._getRowIdOfRowNode(n);
                const column = this._getColumnIdOfRowNode(n);
                const value = this._getValueOfRowNode(n);
                return sudoku[row][column] === value;
            },
            { isColumn: false, maxColumn: this.rowConstraint }
        );
        nodesMatchingSudoku.forEach((n) => this.solver.addToSolution(n));
    }

    private getSudokuFromNetworkSolution(networkSolution: Node[]): number[][] {
        const sudoku = this.createEmptySudoku();
        networkSolution.forEach((n) => {
            const row = this.getRowIdOfNode(n);
            const column = this.getColumnIdOfNode(n);
            const value = this.getValueOfNode(n);
            if (value !== -1) sudoku[row][column] = value;
        });
        return sudoku;
    }

    private generateCompleteSudoku(): number[][] {
        const cells = new Set(
            this.getCellIdsInRow(0)
                .concat(this.getCellIdsInColumn(0))
                .concat(this.getCellIdsInSquare(0))
        );

        this.fillCellsInNetworkRandomly([...cells]);
        const networkSolutions = this.solver.solve({ findOne: true });
        const solution = this.getSudokuFromNetworkSolution(networkSolutions[0]);
        this.solver.reset();
        return solution;
    }

    private generateFromComplete(solution: number[][]): number[][] {
        this.fillCellsInNetworkFromSudoku(solution, this.getRandomCells(15));

        debugger;
        while (this.solver.hasMultipleSolutions()) {
            this.fillCellsInNetworkFromSudoku(solution, this.getRandomCells(3));
        }

        return this.getSudokuFromNetworkSolution(this.solver.currentSolution);
    }

    private fillCellsInNetworkRandomly(cells: number[]): void {
        cells.forEach((cell) => {
            const c = this.solver.network.find(
                (node: Node) => node.columnId === cell
            );

            if (c) {
                const randomTarget = Math.floor(Math.random() * c.size);
                let count = 0;
                const n = c.find("down", (_: Node) => count++ === randomTarget);

                if (n) {
                    this.solver.addToSolution(n);
                }
            }
        });
    }

    private fillCellsInNetworkFromSudoku(
        solution: number[][],
        cells: number[]
    ): void {
        cells.forEach((cell) => {
            const row = this._getRowId(cell);
            const column = this._getColumnId(cell);
            const c = this.solver.network.find(
                (node: Node) => this._getCellIdOfColumnNode(node) === cell,
                { maxColumn: this.rowConstraint }
            );

            const n = c?.find(
                "down",
                (node: Node) =>
                    solution[row][column] === this._getValueOfRowNode(node)
            );
            if (n) this.solver.addToSolution(n);
        });
    }

    private getRandomCells(quantity: number): number[] {
        return Array.from({ length: quantity }, () =>
            Math.floor(Math.random() * this.rowConstraint)
        );
    }
}
