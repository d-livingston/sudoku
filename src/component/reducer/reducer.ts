import type { State } from "./state";
import type { Action } from "./actions";
import { ActionTypes } from "./actions";
import { getColumn, getRow, getSquare } from "../../utils";

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionTypes.SELECT: {
            console.log("SELECTING CELL: " + action.payload.cell);
            const size = state.sudoku.length;
            const { cell } = action.payload;
            const row = getRow(size, cell);
            const column = getColumn(size, cell);
            return {
                ...state,
                selected: {
                    cell,
                    row,
                    column,
                    square: getSquare(size, cell),
                    value: state.sudoku[row][column],
                },
            };
        }
        default: {
            return state;
        }
    }
}
