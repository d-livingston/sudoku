import reducer from "./reducer";
import type { State } from "./state";
import { copySudoku } from "../../utils";

export default reducer;
export * from "./actions";

export function computeInitialState(initialSudoku: number[][]): State {
    return {
        initial: copySudoku(initialSudoku),
        sudoku: copySudoku(initialSudoku),
        selected: {
            cell: -1,
            row: -1,
            column: -1,
            square: -1,
            value: 0,
        },
    };
}
