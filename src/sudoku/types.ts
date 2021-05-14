export type House = "row" | "column" | "square";

export type SudokuSolution = {
    solution: number[][];
    hasMultipleSolutions: boolean;
};

export type GenerateResult = {
    sudoku: number[][];
    solution: number[][];
    numFilledCells: number;
    timeElapsed: number;

    backtrackingDetails: {
        columnsTried: number;
        nodesTried: number;
    };
};
