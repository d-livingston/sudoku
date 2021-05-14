export type House = "row" | "column" | "square";

export type SudokuSolution = {
    solution: number[][];
    hasMultipleSolutions: boolean;
};

export type Difficulty = "easy" | "medium" | "hard" | "expert";

export type GenerateResult = {
    sudoku: number[][];
    solution: number[][];
    numFilledCells: number;
    timeElapsed: number;
    difficulty: Difficulty;
};
