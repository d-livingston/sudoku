import solve from "../../solve";
import { solvedSudokus9x9 } from "../fixtures/sudoku/solutions";

it("solves Sudokus", async () => {
    for (let { sudoku, solution: expected } of solvedSudokus9x9) {
        const { solution, unique } = solve(sudoku);
        expect(solution).toEqual(expected);
        expect(unique).toBe(true);

        console.log(solution);
    }
});
