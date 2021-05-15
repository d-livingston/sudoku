import Sudoku from "../../sudoku";
import { invalidSudokus9x9 } from "../fixtures/sudoku/valid";
import { solvedSudokus9x9 } from "../fixtures/sudoku/solutions";
import { blank9x9 } from "../fixtures/sudoku/reference";

describe("solve", () => {
    it("solves Sudokus", async () => {
        for (let { sudoku, solution: expected } of solvedSudokus9x9) {
            const { solution, hasMultipleSolutions } = await Sudoku.solve(
                sudoku
            );
            expect(solution).toEqual(expected);
            expect(hasMultipleSolutions).toBe(false);
        }
    });

    it("returns an empty array when the Sudoku is invalid", async () => {
        for (let sudoku of invalidSudokus9x9) {
            const { solution } = await Sudoku.solve(sudoku);
            expect(solution).toEqual([]);
        }
    });

    it("correctly determines when Sudokus have multiple solutions", async () => {
        const { hasMultipleSolutions } = await Sudoku.solve(blank9x9);
        expect(hasMultipleSolutions).toBe(true);
    });
});

// import {
//     easy9x9,
//     medium9x9,
//     hard9x9,
//     expert9x9,
// } from "../fixtures/sudoku/difficulty";
// describe("Test for general statistics for difficulty of puzzles", () => {
//     it("test", () => {
//         let numColumnsTried = 0,
//             numNodesTried = 0;
//         for (let sudoku of easy9x9) {
//             const board = new Sudoku(sudoku);
//             const network = board.createNetwork();
//             const { nodesTried, columnsTried } = network.solve();
//             numColumnsTried += columnsTried;
//             numNodesTried += nodesTried;
//         }
//         console.log(
//             `Easy: Average number of columns tried: ${
//                 numColumnsTried / easy9x9.length
//             }`
//         );
//         console.log(
//             `Easy: Average number of nodes tried: ${
//                 numNodesTried / easy9x9.length
//             }`
//         );

//         (numColumnsTried = 0), (numNodesTried = 0);
//         for (let sudoku of medium9x9) {
//             const board = new Sudoku(sudoku);
//             const network = board.createNetwork();
//             const { nodesTried, columnsTried } = network.solve();
//             numColumnsTried += columnsTried;
//             numNodesTried += nodesTried;
//         }
//         console.log(
//             `Medium: Average number of columns tried: ${
//                 numColumnsTried / medium9x9.length
//             }`
//         );
//         console.log(
//             `Medium: Average number of nodes tried: ${
//                 numNodesTried / medium9x9.length
//             }`
//         );

//         (numColumnsTried = 0), (numNodesTried = 0);
//         for (let sudoku of hard9x9) {
//             const board = new Sudoku(sudoku);
//             const network = board.createNetwork();
//             const { nodesTried, columnsTried } = network.solve();
//             numColumnsTried += columnsTried;
//             numNodesTried += nodesTried;
//         }
//         console.log(
//             `Hard: Average number of columns tried: ${
//                 numColumnsTried / hard9x9.length
//             }`
//         );
//         console.log(
//             `Hard: Average number of nodes tried: ${
//                 numNodesTried / hard9x9.length
//             }`
//         );

//         (numColumnsTried = 0), (numNodesTried = 0);
//         for (let sudoku of expert9x9) {
//             const board = new Sudoku(sudoku);
//             const network = board.createNetwork();
//             const { nodesTried, columnsTried } = network.solve();
//             numColumnsTried += columnsTried;
//             numNodesTried += nodesTried;
//         }
//         console.log(
//             `Expert: Average number of columns tried: ${
//                 numColumnsTried / expert9x9.length
//             }`
//         );
//         console.log(
//             `Expert: Average number of nodes tried: ${
//                 numNodesTried / expert9x9.length
//             }`
//         );
//     });
// });
