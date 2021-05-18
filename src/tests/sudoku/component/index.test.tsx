import * as React from "react";
import Sudoku from "../../../sudoku";
import { create } from "react-test-renderer";
const Component = Sudoku.Component;

it("test", () => {
    const root = create(
        <Component sudoku={Sudoku.generateSync().sudoku} />
    ).root;
    const element = root.findByType("div");
    expect(element.props.className.includes("sudoku__container")).toBe(true);
});
