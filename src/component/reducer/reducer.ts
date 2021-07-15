import type { State } from "./state";
import type { Action } from "./actions";
import { ActionTypes } from "./actions";
import {
    getCell,
    getColumn,
    getInvalidCells,
    getRow,
    getSquare,
    getValue,
    isSolvedSudoku,
} from "../../utils";

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionTypes.SELECT: {
            return select(state, action);
        }
        case ActionTypes.SELECT_IN_DIRECTION: {
            return selectInDirection(state, action);
        }
        case ActionTypes.FILL: {
            return fill(state, action);
        }
        case ActionTypes.REMOVE: {
            return remove(state, action);
        }
        case ActionTypes.TOGGLE_NOTES: {
            return {
                ...state,
                notesOn: !state.notesOn,
            };
        }
        default: {
            return state;
        }
    }
}

function select(state: State, action: Action): State {
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

function selectInDirection(state: State, action: Action): State {
    if (state.selected.cell === -1) return state;
    const size = state.sudoku.length;
    const { direction } = action.payload;
    let newRow: number = 0,
        newColumn: number = 0;
    const { row, column } = state.selected;
    switch (direction) {
        case "left": {
            newColumn = (column - 1 + size) % size;
            newRow = row;
            break;
        }
        case "right": {
            newColumn = (column + 1) % size;
            newRow = row;
            break;
        }
        case "up": {
            newColumn = column;
            newRow = (row - 1 + size) % size;
            break;
        }
        case "down": {
            newColumn = column;
            newRow = (row + 1) % size;
            break;
        }
    }

    const newCell = getCell(size, newRow, newColumn);
    return {
        ...state,
        selected: {
            cell: newCell,
            row: newRow,
            column: newColumn,
            square: getSquare(size, newCell),
            value: getValue(state.sudoku, newCell),
        },
    };
}

function fill(state: State, action: Action): State {
    if (selectedCellIsInvalid(state)) return state;
    if (selectedCellIsLocked(state)) return state;

    if (state.notesOn) {
        if (!selectedCellIsEmpty(state)) return state;
        state.notes.toggle(state.selected.cell, action.payload.value);
        return { ...state };
    } else {
        state.notes.remove(state.selected.cell);
        state.sudoku[state.selected.row][state.selected.column] =
            action.payload.value;
        return {
            ...state,
            invalidCells: getInvalidCells(state.sudoku),
            isSolved: isSolvedSudoku(state.sudoku),
            selected: {
                ...state.selected,
                value: action.payload.value,
            },
        };
    }
}

function remove(state: State, _: Action): State {
    if (selectedCellIsInvalid(state)) return state;
    if (selectedCellIsLocked(state)) return state;

    if (state.notesOn) {
        state.notes.remove(state.selected.cell);
        return { ...state };
    } else {
        if (selectedCellIsEmpty(state)) return { ...state };

        state.sudoku[state.selected.row][state.selected.column] = 0;
        return {
            ...state,
            invalidCells: getInvalidCells(state.sudoku),
            selected: {
                ...state.selected,
                value: 0,
            },
        };
    }
}

function selectedCellIsInvalid(state: State): boolean {
    return state.selected.cell === -1;
}

function selectedCellIsLocked(state: State): boolean {
    const { row, column } = state.selected;
    return state.initial[row][column] !== 0;
}

function selectedCellIsEmpty(state: State): boolean {
    const { row, column } = state.selected;
    return state.sudoku[row][column] === 0;
}
