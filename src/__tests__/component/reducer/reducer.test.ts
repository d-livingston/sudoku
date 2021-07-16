import reducer, {
    select,
    selectInDirection,
    fill,
    remove,
} from "../../../component/reducer";
import {
    getNearlySolvedTestState,
    getTestState,
} from "../../__fixtures__/reducer";

describe("select", () => {
    it("selects a cell correctly", () => {
        const state = getTestState();
        expect(reducer(state, select(5))).toEqual(
            expect.objectContaining({
                selected: {
                    cell: 5,
                    row: 0,
                    column: 5,
                    square: 1,
                    value: 0,
                },
            })
        );
    });
});

describe("selectInDirection", () => {
    it("selects a cell to the left", () => {
        const state = reducer(getTestState(), select(1));
        const cell0 = reducer(state, selectInDirection("left"));
        expect(cell0).toEqual(
            expect.objectContaining({
                selected: {
                    cell: 0,
                    row: 0,
                    column: 0,
                    square: 0,
                    value: 9,
                },
            })
        );
        const cell8 = reducer(cell0, selectInDirection("left"));
        expect(cell8).toEqual(
            expect.objectContaining({
                selected: {
                    cell: 8,
                    row: 0,
                    column: 8,
                    square: 2,
                    value: 0,
                },
            })
        );
    });

    it("selects a cell to the right", () => {
        const state = reducer(getTestState(), select(79));
        const cell80 = reducer(state, selectInDirection("right"));
        expect(cell80).toEqual(
            expect.objectContaining({
                selected: {
                    cell: 80,
                    row: 8,
                    column: 8,
                    square: 8,
                    value: 0,
                },
            })
        );
        const cell72 = reducer(cell80, selectInDirection("right"));
        expect(cell72).toEqual(
            expect.objectContaining({
                selected: {
                    cell: 72,
                    row: 8,
                    column: 0,
                    square: 6,
                    value: 5,
                },
            })
        );
    });

    it("selects a cell above", () => {
        const state = reducer(getTestState(), select(9));
        const cell0 = reducer(state, selectInDirection("up"));
        expect(cell0).toEqual(
            expect.objectContaining({
                selected: {
                    cell: 0,
                    row: 0,
                    column: 0,
                    square: 0,
                    value: 9,
                },
            })
        );
        const cell72 = reducer(cell0, selectInDirection("up"));
        expect(cell72).toEqual(
            expect.objectContaining({
                selected: {
                    cell: 72,
                    row: 8,
                    column: 0,
                    square: 6,
                    value: 5,
                },
            })
        );
    });

    it("selects a cell below", () => {
        const state = reducer(getTestState(), select(63));
        const cell72 = reducer(state, selectInDirection("down"));
        expect(cell72).toEqual(
            expect.objectContaining({
                selected: {
                    cell: 72,
                    row: 8,
                    column: 0,
                    square: 6,
                    value: 5,
                },
            })
        );
        const cell0 = reducer(cell72, selectInDirection("down"));
        expect(cell0).toEqual(
            expect.objectContaining({
                selected: {
                    cell: 0,
                    row: 0,
                    column: 0,
                    square: 0,
                    value: 9,
                },
            })
        );
    });

    it("does nothing when no cell has been selected yet", () => {
        const state = getTestState();
        expect(reducer(state, selectInDirection("left"))).toEqual(state);
    });
});

describe("fill", () => {
    it("fills an empty cell with a valid value", () => {
        const state = reducer(getTestState(), select(1));
        const filled = reducer(state, fill(1));
        expect(filled.selected.value).toEqual(1);
        expect(filled.invalidCells.size).toEqual(0);
        expect(filled.sudoku[0][1]).toEqual(1);
        expect(filled.initial[0][1]).toEqual(0);
        expect(filled.isSolved).toBe(false);
    });

    it("fills an empty cell with an invalid value", () => {
        const state = reducer(getTestState(), select(1));
        const filled = reducer(state, fill(9));
        expect(filled.selected.value).toEqual(9);
        expect(filled.invalidCells.size).toEqual(2);
        expect(filled.invalidCells.has(0)).toBe(true);
        expect(filled.invalidCells.has(1)).toBe(true);
        expect(filled.sudoku[0][1]).toEqual(9);
        expect(filled.initial[0][1]).toEqual(0);
        expect(filled.isSolved).toBe(false);
    });

    it("marks the puzzle as solved when the last cell is filled", () => {
        const state = reducer(getNearlySolvedTestState(), select(0));
        expect(reducer(state, fill(8))).toEqual(
            expect.objectContaining({ isSolved: true })
        );
    });

    it("does nothing when no cell is selected", () => {
        const state = getTestState();
        expect(reducer(state, fill(4))).toEqual(state);
    });

    it("does nothing when trying to fill a locked cell", () => {
        const state = reducer(getTestState(), select(0));
        expect(reducer(state, fill(1))).toEqual(state);
    });
});

describe("remove", () => {
    it("removes an unlocked cell with a valid value", () => {
        const state = reducer(reducer(getTestState(), select(1)), fill(8));
        const removed = reducer(state, remove());
        expect(removed.selected.value).toEqual(0);
    });

    it("does nothing when trying to remove an empty cell", () => {
        const state = reducer(getTestState(), select(1));
        expect(reducer(state, remove())).toEqual(state);
    });

    it("does nothing when trying to remove an unlocked cell", () => {
        const state = reducer(getTestState(), select(0));
        expect(reducer(state, remove())).toEqual(state);
    });
});
