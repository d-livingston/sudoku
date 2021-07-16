import Network from "./network";
import {
    createBlankSudokuNetwork,
    removeMatchingNodes,
    getSudokuSolution,
} from "./sudoku";

export default function solve(
    sudoku: number[][]
): {
    solution: number[][];
    unique: boolean;
} {
    const network: Network = createBlankSudokuNetwork(sudoku.length);
    removeMatchingNodes(network, sudoku);
    const { solution, unique } = network.solve();
    return {
        solution: getSudokuSolution(solution, sudoku),
        unique,
    };
}
