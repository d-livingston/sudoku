import type { State } from "../../component/reducer";
import { computeInitialState } from "../../component/reducer";
import { solved, nearlySolved } from "./sudoku";

export const getTestState = (): State => {
    return computeInitialState(solved[0].sudoku);
};

export const getNearlySolvedTestState = (): State => {
    return computeInitialState(nearlySolved);
};
