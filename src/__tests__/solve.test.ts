import solve from "../solve";
import { blank, invalid, solved } from "./__fixtures__/sudoku";

it("solves Sudokus", async () => {
    for (let { sudoku, solution: expected } of solved) {
        const { solution, unique } = solve(sudoku);
        expect(solution).toEqual(expected);
        expect(unique).toBe(true);
    }
});

it("returns an empty array when the Sudoku is invalid", () => {
    for (let sudoku of invalid) {
        const { solution } = solve(sudoku);
        expect(solution).toEqual(blank);
    }
});

it("correctly determines when Sudokus have multiple solutions", () => {
    const { unique } = solve(blank);
    expect(unique).toBe(false);
});
