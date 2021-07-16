import * as React from "react";
import { create } from "react-test-renderer";
import Value from "../../component/Value";

it("renders the value correctly when using a non-zero value", () => {
    const wrapper = create(<Value value={1} />).root;
    expect(wrapper.findByType("text").children).toEqual(["1"]);
});

it("renders the value correctly when using 0", () => {
    const wrapper = create(<Value value={0} />).root;
    expect(wrapper.findByType("text").children).toEqual([]);
});
