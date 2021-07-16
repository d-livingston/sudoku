export enum ActionTypes {
    REMOVE = "Remove cell",
    FILL = "Fill cell",
    SELECT = "Select cell",
    SELECT_IN_DIRECTION = "Select cell in direction",
    TOGGLE_NOTES = "Toggle notes",
}

export interface Action {
    type: ActionTypes;
    payload?: any;
}

export function select(cell: number): Action {
    return {
        type: ActionTypes.SELECT,
        payload: {
            cell,
        },
    };
}

export function selectInDirection(
    direction: "left" | "right" | "up" | "down"
): Action {
    return {
        type: ActionTypes.SELECT_IN_DIRECTION,
        payload: {
            direction,
        },
    };
}

export function fill(value: number): Action {
    return {
        type: ActionTypes.FILL,
        payload: {
            value,
        },
    };
}

export function remove(): Action {
    return {
        type: ActionTypes.REMOVE,
    };
}

export function toggleNotes(): Action {
    return {
        type: ActionTypes.TOGGLE_NOTES,
    };
}
