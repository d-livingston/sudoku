export type House = "row" | "column" | "square";

export type SudokuSolution = {
    solution: number[][];
    hasMultipleSolutions: boolean;
};
