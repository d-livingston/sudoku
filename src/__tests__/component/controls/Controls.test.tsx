import * as React from "react";
import { create } from "react-test-renderer";
import Controls from "../../../component/controls/Controls";
import { ActionTypes } from "../../../component/reducer";
import { getTestState } from "../../__fixtures__/reducer";

it("renders controls with a number pad and two other buttons", () => {
    const state = getTestState();
    const wrapper = create(<Controls state={state} dispatch={() => {}} />).root;
    expect(wrapper.findAllByType("button")).toHaveLength(
        state.sudoku.length + 2
    );
});

it("adds a class name to indicate the controls are hidden when showControls is false", () => {
    const wrapper = create(
        <Controls
            state={getTestState()}
            dispatch={() => {}}
            showControls={false}
        />
    ).root;
    expect(wrapper.findAllByType("div")[0].props.className).toMatch(
        "sudoku__controls_hidden"
    );
});

it("calls the dispatch function with a toggleNotes action when the notes button is clicked", () => {
    const dispatch = jest.fn();
    const wrapper = create(
        <Controls state={getTestState()} dispatch={dispatch} />
    ).root;
    wrapper
        .findByProps({ className: "sudoku__notes_btn" })
        .findByType("button")
        .props.onClick();
    expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: ActionTypes.TOGGLE_NOTES })
    );
});

it("calls the dispatch function with a remove action when the erase button is clicked", () => {
    const dispatch = jest.fn();
    const wrapper = create(
        <Controls state={getTestState()} dispatch={dispatch} />
    ).root;
    wrapper
        .findByProps({ className: "sudoku__erase_btn" })
        .findByType("button")
        .props.onClick();
    expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: ActionTypes.REMOVE })
    );
});

it("calls the dispatch function with a fill action when a number in the numberpad is clicked", () => {
    const dispatch = jest.fn();
    const wrapper = create(
        <Controls state={getTestState()} dispatch={dispatch} />
    ).root;
    wrapper
        .findByProps({ className: "sudoku__number_pad" })
        .findAllByType("button")[3]
        .props.onClick();
    expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
            type: ActionTypes.FILL,
            payload: { value: 4 },
        })
    );
});
