export type House = "row" | "column" | "square";

export type SudokuSolution = {
    solution: number[][];
    hasMultipleSolutions: boolean;
};

export type Difficulty = "easy" | "medium" | "hard" | "expert";

/**
 * @property {Array<number><number>} sudoku - An nxn matrix representing the Sudoku puzzle.
 * @property {Array<number><number>} solution - An nxn matrix representing the solution of the Sudoku puzzle.
 * @property {string} difficulty - The difficulty of the puzzle. Either easy, medium, hard, or expert.
 */
export type GenerateResult = {
    sudoku: number[][];
    solution: number[][];
    difficulty: Difficulty;
};
