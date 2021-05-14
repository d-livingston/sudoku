import SudokuIndex from "../index";
import Sudoku from "../sudoku";

describe("Sudoku", () => {
    it("should be aliased", () => {
        expect(SudokuIndex).toBe(Sudoku);
    });
});
