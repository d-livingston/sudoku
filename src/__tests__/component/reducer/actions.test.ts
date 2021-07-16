import {
    ActionTypes,
    fill,
    remove,
    select,
    selectInDirection,
    toggleNotes,
} from "../../../component/reducer/actions";

describe("select action", () => {
    it("returns the correct action", () => {
        expect(select(4)).toEqual({
            type: ActionTypes.SELECT,
            payload: {
                cell: 4,
            },
        });
    });
});

describe("selectInDirection action", () => {
    it("returns the correct action", () => {
        expect(selectInDirection("down")).toEqual({
            type: ActionTypes.SELECT_IN_DIRECTION,
            payload: {
                direction: "down",
            },
        });
    });
});

describe("fill action", () => {
    it("returns the correct action", () => {
        expect(fill(7)).toEqual({
            type: ActionTypes.FILL,
            payload: {
                value: 7,
            },
        });
    });
});

describe("remove action", () => {
    it("returns the correct action", () => {
        expect(remove()).toEqual({
            type: ActionTypes.REMOVE,
        });
    });
});

describe("toggleNotes action", () => {
    it("returns the correct action", () => {
        expect(toggleNotes()).toEqual({
            type: ActionTypes.TOGGLE_NOTES,
        });
    });
});
