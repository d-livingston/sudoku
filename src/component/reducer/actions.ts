export enum ActionTypes {
    DELETE = "Delete cell",
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
        type: ActionTypes.FILL,
        payload: {
            cell,
        },
    };
}
