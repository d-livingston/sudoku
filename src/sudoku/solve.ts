import { Sudoku } from "./sudoku";
import "./network";
import { SudokuSolution } from "./types";

declare module "./sudoku" {
    namespace Sudoku {
        /**
         * Solves the current Sudoku puzzle and returns the solution.
         * @returns {SudokuSolution} An object with the solution and whether the puzzle has multiple solutions or not.
         */
        export function solve(sudoku: number[][]): Promise<SudokuSolution>;
        /**
         * Solves the Sudoku puzzle and returns the solution.
         * @param sudoku An nxn matrix representing the Sudoku puzzle.
         * @returns {SudokuSolution} An object with the solution and whether the puzzle has multiple solutions or not.
         */
        export function solveSync(sudoku: number[][]): SudokuSolution;
    }

    interface Sudoku {
        /**
         * Solves the current Sudoku puzzle and returns the solution.
         * @returns {SudokuSolution} An object with the solution and whether the puzzle has multiple solutions or not.
         */
        solve(): Promise<SudokuSolution>;
        /**
         * Solves the current Sudoku puzzle and returns the solution.
         * @returns {SudokuSolution} An object with the solution and whether the puzzle has multiple solutions or not.
         */
        solveSync(): SudokuSolution;
    }
}

Sudoku.prototype.solve = async function (): Promise<SudokuSolution> {
    const { solution: networkSolution, hasMultipleSolutions } = await (
        await this.createNetwork()
    ).solve();

    const solution = Sudoku.generateBlank(this.size);
    networkSolution.forEach((n) => {
        const row = this.getRowIdOfNode(n);
        const column = this.getColumnIdOfNode(n);
        const value = this.getValueOfNode(n);
        if (value !== -1) solution[row][column] = value;
    });

    return {
        solution,
        hasMultipleSolutions,
    };
};

Sudoku.prototype.solveSync = function (): SudokuSolution {
    const { solution: networkSolution, hasMultipleSolutions } =
        this.createNetworkSync().solveSync();

    const solution = Sudoku.generateBlank(this.size);
    networkSolution.forEach((n) => {
        const row = this.getRowIdOfNode(n);
        const column = this.getColumnIdOfNode(n);
        const value = this.getValueOfNode(n);
        if (value !== -1) solution[row][column] = value;
    });

    return {
        solution,
        hasMultipleSolutions,
    };
};

Sudoku.solve = async function (sudoku: number[][]): Promise<SudokuSolution> {
    try {
        const board = new Sudoku(sudoku);
        return await board.solve();
    } catch {
        return {
            solution: [],
            hasMultipleSolutions: false,
        };
    }
};

Sudoku.solveSync = function (sudoku: number[][]): SudokuSolution {
    try {
        const board = new Sudoku(sudoku);
        return board.solveSync();
    } catch {
        return {
            solution: [],
            hasMultipleSolutions: false,
        };
    }
};
