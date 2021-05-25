import { Direction } from "../../directions";
import { Notes, createNotes, toggleNote, deleteCellNotes } from "./notes";
import { Sudoku } from "../sudoku";

export type SudokuReducerState = {
    board: Sudoku;
    notes: Notes;
    isComplete: boolean;
    isTakingNotes: boolean;
    selected: {
        cell: number;
        row: number;
        column: number;
        square: number;
        value: number;
    };
    invalidCells: Set<number>;
};

export function computeInitialState(sudoku: number[][]): SudokuReducerState {
    const board = new Sudoku(sudoku);
    return {
        board: board,
        isComplete: board.isComplete(),
        isTakingNotes: false,
        notes: createNotes(board.size),
        selected: board.getCellInfo(-1),
        invalidCells: new Set<number>(),
    };
}

export enum SudokuReducerActionTypes {
    DELETE_CELL = "Delete cell",
    FILL_CELL = "Fill cell",
    SELECT_CELL = "Select cell",
    SELECT_CELL_IN_DIRECTION = "Select cell in direction",
    TOGGLE_NOTES = "Toggle notes",
}

export interface SudokuReducerAction {
    type: SudokuReducerActionTypes;
    payload?: any;
}

export function deleteCell(): SudokuReducerAction {
    return {
        type: SudokuReducerActionTypes.DELETE_CELL,
    };
}

export function fillCell(value: number): SudokuReducerAction {
    return {
        type: SudokuReducerActionTypes.FILL_CELL,
        payload: { value },
    };
}

export function selectCell(cell: number): SudokuReducerAction {
    return {
        type: SudokuReducerActionTypes.SELECT_CELL,
        payload: { cell },
    };
}

export function selectCellInDirection(
    direction: Direction
): SudokuReducerAction {
    return {
        type: SudokuReducerActionTypes.SELECT_CELL_IN_DIRECTION,
        payload: { direction },
    };
}

export function toggleNotes(): SudokuReducerAction {
    return {
        type: SudokuReducerActionTypes.TOGGLE_NOTES,
    };
}

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
        case SudokuReducerActionTypes.TOGGLE_NOTES: {
            return {
                ...state,
                isTakingNotes: !state.isTakingNotes,
            };
        }
        default: {
            return state;
        }
    }
}

function handleDeleteCell(
    state: SudokuReducerState,
    _: SudokuReducerAction
): SudokuReducerState {
    const { board } = state;
    const { cell } = state.selected;

    if (!board.isValidCellId(cell)) return state;
    if (board.isLocked(cell)) return state;
    if (state.selected.value) {
        board.setValue(cell, 0);
        return {
            ...state,
            selected: board.getCellInfo(cell),
            invalidCells: board.getInvalidCells(),
        };
    } else if (state.isTakingNotes) {
        return {
            ...state,
            notes: deleteCellNotes(state.notes, state.selected.cell),
        };
    } else {
        return state;
    }
}

function handleFillCell(
    state: SudokuReducerState,
    action: SudokuReducerAction
): SudokuReducerState {
    const { board } = state;
    const { cell } = state.selected;

    if (!board.isValidCellId(cell)) return state;
    if (board.isLocked(cell)) return state;
    if (state.isTakingNotes) {
        if (state.selected.value !== 0) return state;
        return {
            ...state,
            notes: toggleNote(state.notes, cell, action.payload.value),
        };
    } else {
        board.setValue(cell, action.payload.value);
        const cellsInSameHouse = board.getCellIdsInSameHouse(cell);
        cellsInSameHouse.forEach((cellId) => {
            state.notes[cellId][action.payload.value - 1] = false;
        });
        return {
            ...state,
            isComplete: board.isComplete(),
            selected: board.getCellInfo(cell),
            invalidCells: board.getInvalidCells(),
        };
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
