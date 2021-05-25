import reducer, {
    computeInitialState,
    deleteCell,
    fillCell,
    selectCell,
    selectCellInDirection,
    toggleNotes,
    SudokuReducerActionTypes,
} from "../../../sudoku/component/reducer";
import { Sudoku } from "../../../sudoku/sudoku";
import { validSudokus9x9 } from "../../fixtures/sudoku/valid";

describe("Actions", () => {
    describe("delete cell action", () => {
        it("returns the correct action", () => {
            expect(deleteCell()).toEqual({
                type: SudokuReducerActionTypes.DELETE_CELL,
            });
        });
    });
    describe("fill cell action", () => {
        it("returns the correct action", () => {
            expect(fillCell(5)).toEqual({
                type: SudokuReducerActionTypes.FILL_CELL,
                payload: { value: 5 },
            });
        });
    });
    describe("select cell action", () => {
        it("returns the correct action", () => {
            expect(selectCell(5)).toEqual({
                type: SudokuReducerActionTypes.SELECT_CELL,
                payload: { cell: 5 },
            });
        });
    });
    describe("select cell in direction action", () => {
        it("returns the correct action", () => {
            expect(selectCellInDirection("left")).toEqual({
                type: SudokuReducerActionTypes.SELECT_CELL_IN_DIRECTION,
                payload: { direction: "left" },
            });
        });
    });
    describe("toggle note action", () => {
        it("returns the correct action", () => {
            expect(toggleNotes()).toEqual({
                type: SudokuReducerActionTypes.TOGGLE_NOTES,
            });
        });
    });
});

describe("Reducer", () => {
    const initialState = computeInitialState(validSudokus9x9[0]);

    describe("initial state", () => {
        it("computes the correct initial state", () => {
            expect(initialState).toEqual({
                board: expect.any(Sudoku),
                isComplete: false,
                isTakingNotes: false,
                notes: expect.not.arrayContaining([true]),
                selected: {
                    cell: -1,
                    row: -1,
                    column: -1,
                    square: -1,
                    value: -1,
                },
                invalidCells: new Set(),
            });
        });
    });

    describe("select cell action", () => {
        it("selects a cell and returns the correct state", () => {
            const state = reducer(initialState, selectCell(5));
            expect(state).toEqual({
                ...initialState,
                selected: {
                    cell: 5,
                    row: 0,
                    column: 5,
                    square: 1,
                    value: validSudokus9x9[0][0][5],
                },
            });
        });
    });

    describe("fill cell action", () => {
        it("does nothing when no cell is selected", () => {
            expect(reducer(initialState, fillCell(3))).toEqual(initialState);
        });

        it("does nothing to locked cells", () => {
            const selectedState = reducer(initialState, selectCell(0));
            expect(reducer(selectedState, fillCell(1))).toEqual(selectedState);
        });

        it("fills unlocked cells when in editing mode", () => {
            const selectedState = reducer(initialState, selectCell(1));
            expect(reducer(selectedState, fillCell(3))).toEqual({
                ...selectedState,
                selected: {
                    ...selectedState.selected,
                    value: 3,
                },
            });
        });

        it("fills unlocked cells with invalid values when in editing mode", () => {
            const selectedState = reducer(initialState, selectCell(1));
            expect(reducer(selectedState, fillCell(9))).toEqual({
                ...selectedState,
                selected: {
                    ...selectedState.selected,
                    value: 9,
                },
                invalidCells: new Set([0, 1]),
            });
        });
    });
});
