import Sudoku from "../../sudoku";

describe("Static Method: generateComplete", () => {
    it("generates a Sudoku of size 9 by default", () => {
        const sudoku = Sudoku.generateComplete();
        expect(Sudoku.isComplete(sudoku)).toBe(true);
    });
});

describe("Static Method: generate", () => {
    it("generates an incomplete Sudoku of size 9 by default", () => {
        const { sudoku } = Sudoku.generate();
        expect(Sudoku.isValid(sudoku)).toBe(true);
        expect(Sudoku.isComplete(sudoku)).toBe(false);
    });
});

// TODO REMOVE
// it("test", () => {
//     let totalTime = 0,
//         totalFilledCells = 0,
//         numColumnsTried = 0,
//         numNodesTried = 0,
//         numTrials = 100;
//     for (let i = 0; i < numTrials; i++) {
//         const { sudoku, timeElapsed, numFilledCells, backtrackingDetails } =
//             Sudoku.generate();
//         const { nodesTried, columnsTried } = backtrackingDetails;
//         numColumnsTried += columnsTried;
//         numNodesTried += nodesTried;
//         totalTime += timeElapsed;
//         totalFilledCells += numFilledCells;

//         if (nodesTried > 70) {
//             console.log(
//                 i,
//                 columnsTried,
//                 nodesTried,
//                 timeElapsed,
//                 numFilledCells
//             );

//             console.log(sudoku);
//         }
//     }

//     console.log(`Average time taken: ${totalTime / numTrials}`);
//     console.log(
//         `Average number of filled cells: ${totalFilledCells / numTrials}`
//     );
//     console.log(
//         `Average number of columns tried: ${numColumnsTried / numTrials}`
//     );
//     console.log(`Average number of nodes tried: ${numNodesTried / numTrials}`);
// });
