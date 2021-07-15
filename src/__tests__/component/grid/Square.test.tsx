import * as React from "react";
import { create } from "react-test-renderer";
import Square from "../../../component/grid/Square";
import Cell from "../../../component/grid/Cell";
import { getTestState } from "../../__fixtures__/reducer";

it("renders a div with 9 buttons by default", () => {
    const wrapper = create(
        <Square id={1} selectCell={() => {}} state={getTestState()} />
    ).root;
    expect(wrapper.findAllByType("button")).toHaveLength(9);
});

it("renders the correct cells", () => {
    const wrapper = create(
        <Square id={1} selectCell={() => {}} state={getTestState()} />
    ).root;
    expect(
        wrapper.findAllByType(Cell).map((cell) => cell.props.value)
    ).toEqual([4, 0, 0, 1, 3, 0, 0, 0, 0]);
});
