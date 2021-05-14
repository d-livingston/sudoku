import Sudoku from "../../sudoku";
import { invalidSudokus9x9 } from "../fixtures/sudoku/valid";
import { solvedSudokus9x9 } from "../fixtures/sudoku/solutions";
import { blank9x9 } from "../fixtures/sudoku/reference";

describe("solve", () => {
    it("solves Sudokus", () => {
        for (let { sudoku, solution: expected } of solvedSudokus9x9) {
            const { solution, hasMultipleSolutions } = Sudoku.solve(sudoku);
            expect(solution).toEqual(expected);
            expect(hasMultipleSolutions).toBe(false);
        }
    });

    it("returns an empty array when the Sudoku is invalid", () => {
        for (let sudoku of invalidSudokus9x9) {
            const { solution } = Sudoku.solve(sudoku);
            expect(solution).toEqual([]);
        }
    });

    it("correctly determines when Sudokus have multiple solutions", () => {
        const { hasMultipleSolutions } = Sudoku.solve(blank9x9);
        expect(hasMultipleSolutions).toBe(true);
    });
});
