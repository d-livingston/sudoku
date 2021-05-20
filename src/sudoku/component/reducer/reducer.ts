import { selectCell } from "./actions";
import {
    SudokuReducerState,
    SudokuReducerAction,
    SudokuReducerActionTypes,
} from "./types";

export default function reducer(
    state: SudokuReducerState,
    action: SudokuReducerAction
): SudokuReducerState {
    switch (action.type) {
        case SudokuReducerActionTypes.SELECT_CELL: {
            return handleSelectCell(state, action);
        }
        case SudokuReducerActionTypes.SELECT_CELL_IN_DIRECTION: {
            return handleSelectCellInDirection(state, action);
        }
        default: {
            throw new Error("Invalid action.");
        }
    }
}

function handleSelectCell(
    state: SudokuReducerState,
    action: SudokuReducerAction
): SudokuReducerState {
    const newSelected = state.board.getCellInfo(action.payload.cell);
    return {
        ...state,
        selected: newSelected,
    };
}

function handleSelectCellInDirection(
    state: SudokuReducerState,
    action: SudokuReducerAction
): SudokuReducerState {
    const newCell = state.board.getCellIdInDirection(
        state.selected.cell,
        action.payload.direction
    );
    return handleSelectCell(state, selectCell(newCell));
}
