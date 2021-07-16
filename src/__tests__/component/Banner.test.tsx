import * as React from "react";
import { create } from "react-test-renderer";
import Banner from "../../component/Banner";

it("renders the banner correctly when it is not visible", () => {
    const wrapper = create(<Banner visible={false} />).root;
    expect(wrapper.findAllByType("div")[0].props.className).toMatch(
        "sudoku__banner"
    );
    expect(wrapper.findAllByType("div")[0].props.className).toMatch(
        "sudoku__banner_hidden"
    );
});

it("renders the banner correctly when it is visible", () => {
    const wrapper = create(<Banner visible={true} />).root;
    expect(wrapper.findAllByType("div")[0].props.className).toMatch(
        "sudoku__banner"
    );
    expect(wrapper.findAllByType("div")[0].props.className).not.toMatch(
        "sudoku__banner_hidden"
    );
});
