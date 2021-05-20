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
        case SudokuReducerActionTypes.DELETE_CELL: {
            return handleDeleteCell(state, action);
        }
        case SudokuReducerActionTypes.FILL_CELL: {
            return handleFillCell(state, action);
        }
        case SudokuReducerActionTypes.SELECT_CELL: {
            return handleSelectCell(state, action);
        }
        case SudokuReducerActionTypes.SELECT_CELL_IN_DIRECTION: {
            const newCell = state.board.getCellIdInDirection(
                state.selected.cell,
                action.payload.direction
            );
            return handleSelectCell(state, selectCell(newCell));
        }
        default: {
            throw new Error("Invalid action.");
        }
    }
}

function handleDeleteCell(
    state: SudokuReducerState,
    _: SudokuReducerAction
): SudokuReducerState {
    const { board } = state;
    const { cell } = state.selected;

    if (board.isLocked(cell)) return state;

    board.setValue(cell, 0);
    return {
        ...state,
        selected: board.getCellInfo(cell),
    };
}

function handleFillCell(
    state: SudokuReducerState,
    action: SudokuReducerAction
): SudokuReducerState {
    const { board } = state;
    const { cell } = state.selected;

    if (board.isLocked(cell)) return state;

    board.setValue(cell, action.payload.value);
    return {
        ...state,
        selected: board.getCellInfo(cell),
    };
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
