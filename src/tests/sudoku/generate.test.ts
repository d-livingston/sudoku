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

// it("test", () => {
//     let totalTime = 0,
//         totalFilledCells = 0,
//         numTrials = 100;

//     let numEasy = 0,
//         numMedium = 0,
//         numHard = 0,
//         numExpert = 0;

//     for (let i = 0; i < numTrials; i++) {
//         const { timeElapsed, numFilledCells, difficulty } = Sudoku.generate();
//         totalTime += timeElapsed;
//         totalFilledCells += numFilledCells;

//         switch (difficulty) {
//             case "easy": {
//                 numEasy++;
//                 break;
//             }
//             case "medium": {
//                 numMedium++;
//                 break;
//             }
//             case "hard": {
//                 numHard++;
//                 break;
//             }
//             case "expert": {
//                 numExpert++;
//                 break;
//             }
//         }
//     }

//     console.log(`Average time taken: ${totalTime / numTrials}`);
//     console.log(
//         `Average number of filled cells: ${totalFilledCells / numTrials}`
//     );
//     console.log(
//         `Distribution of difficulty: Easy - ${numEasy / numTrials} | Medium - ${
//             numMedium / numTrials
//         } | Hard - ${numHard / numTrials} | Expert - ${numExpert / numTrials}`
//     );
// });
