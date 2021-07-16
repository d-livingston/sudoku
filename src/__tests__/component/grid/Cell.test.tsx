import * as React from "react";
import { create } from "react-test-renderer";
import Cell from "../../../component/grid/Cell";

const getEmptyNotes = () => Array.from({ length: 9 }, () => false);

it("renders a button with the value inside", () => {
    const wrapper = create(
        <Cell onClick={() => {}} value={3} notes={getEmptyNotes()} />
    ).root;
    expect(wrapper.findByType("button"));
    expect(wrapper.findByType("text").children).toEqual(["3"]);
});

it("calls the function when the button is clicked", () => {
    const onClick = jest.fn();
    const wrapper = create(
        <Cell onClick={onClick} value={3} notes={getEmptyNotes()} />
    ).root;
    wrapper.findByType("button").props.onClick();
    expect(onClick).toHaveBeenCalled();
});

it("displays notes when the button has a value of 0", () => {
    const wrapper = create(
        <Cell onClick={() => {}} value={0} notes={getEmptyNotes()} />
    ).root;

    expect(wrapper.findByType("button").props.className).toMatch(
        "sudoku__notes"
    );
    expect(wrapper.findAllByType("svg")).toHaveLength(9);
});

it("adds the same value className when prompted", () => {
    const wrapper = create(
        <Cell
            onClick={() => {}}
            value={2}
            notes={getEmptyNotes()}
            hasSameValue={true}
        />
    ).root;
    expect(wrapper.findByType("button").props.className).toMatch(
        "sudoku__same_value"
    );
});

it("adds the same house className when prompted", () => {
    const wrapper = create(
        <Cell
            onClick={() => {}}
            value={2}
            notes={getEmptyNotes()}
            isInSameHouse={true}
        />
    ).root;
    expect(wrapper.findByType("button").props.className).toMatch(
        "sudoku__same_house"
    );
});

it("adds the is selected className when prompted", () => {
    const wrapper = create(
        <Cell
            onClick={() => {}}
            value={2}
            notes={getEmptyNotes()}
            isSelected={true}
        />
    ).root;
    expect(wrapper.findByType("button").props.className).toMatch(
        "sudoku__selected"
    );
});

it("adds the is invalid className when prompted", () => {
    const wrapper = create(
        <Cell
            onClick={() => {}}
            value={2}
            notes={getEmptyNotes()}
            isInvalid={true}
        />
    ).root;
    expect(wrapper.findByType("button").props.className).toMatch(
        "sudoku__invalid"
    );
});

it("adds the is locked className when prompted", () => {
    const wrapper = create(
        <Cell
            onClick={() => {}}
            value={2}
            notes={getEmptyNotes()}
            isLocked={true}
        />
    ).root;
    expect(wrapper.findByType("button").props.className).toMatch(
        "sudoku__locked"
    );
});
