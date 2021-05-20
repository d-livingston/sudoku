import { SudokuReducerAction, SudokuReducerActionTypes } from "./types";
import { Direction } from "../../../types";

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
