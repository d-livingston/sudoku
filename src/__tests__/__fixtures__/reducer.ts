import type { State } from "../../component/reducer";
import { computeInitialState } from "../../component/reducer";
import { solved } from "./sudoku";

export const getTestState = (): State => {
    return computeInitialState(solved[0].sudoku);
};
