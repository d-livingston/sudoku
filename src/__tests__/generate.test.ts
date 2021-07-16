import { generate } from "../generate";
import { isSolvedSudoku, isValidSudoku } from "../utils";

it("generates a sudoku", () => {
    const sudoku = generate();
    expect(sudoku).toBeValid();
    expect(sudoku).not.toBeSolved();
});

it("generates a sudoku with its solution with the verbose flag", () => {
    const { sudoku, solution } = generate({ verbose: true });
    expect(sudoku).toBeValid();
    expect(sudoku).not.toBeSolved();
    expect(solution).toBeValid();
    expect(solution).toBeSolved();
});

expect.extend({
    toBeSolved(received: number[][]) {
        const pass = isSolvedSudoku(received);
        return {
            message: () =>
                `expected the Sudoku to${pass ? " not " : " "}be solved`,
            pass,
        };
    },

    toBeValid(received: number[][]) {
        const pass = isValidSudoku(received);
        return {
            message: () =>
                `expected the Sudoku to${pass ? " not " : " "}be valid`,
            pass,
        };
    },
});
