import * as React from "react";
import { create } from "react-test-renderer";
import Grid from "../../../component/grid/Grid";
import { getTestState } from "../../__fixtures__/reducer";

it("renders 81 buttons in the grid", () => {
    const wrapper = create(
        <Grid state={getTestState()} selectCell={() => {}} />
    ).root;
    const grid = wrapper.findByProps({ className: "sudoku__grid" });
    expect(grid.findAllByType("button")).toHaveLength(81);
});
