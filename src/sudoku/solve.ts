import { Sudoku } from "./sudoku";
import "./network";
import { SudokuSolution } from "./types";

declare module "./sudoku" {
    namespace Sudoku {
        export function solve(sudoku: number[][]): SudokuSolution;
    }

    interface Sudoku {
        solve(): SudokuSolution;
    }
}

Sudoku.prototype.solve = function (): SudokuSolution {
    const { solution: networkSolution, hasMultipleSolutions } =
        this.createNetwork().solve();

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

Sudoku.solve = function (sudoku: number[][]): SudokuSolution {
    try {
        const board = new Sudoku(sudoku);
        return board.solve();
    } catch {
        return {
            solution: [],
            hasMultipleSolutions: false,
        };
    }
};
