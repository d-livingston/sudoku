import * as React from "react";
import { create } from "react-test-renderer";
import NumberPad from "../../../component/controls/NumberPad";

it("renders a div with a determines number of buttons", () => {
    const numberOfButtons = 9;
    const wrapper = create(
        <NumberPad size={numberOfButtons} dispatchNumber={() => {}} />
    ).root;
    const div = wrapper.findByType("div");
    expect(div.findAllByType("button")).toHaveLength(numberOfButtons);
});

it("calls the dispatchNumber function when a button is clicked", () => {
    const fn = jest.fn((value: number) => value);
    const wrapper = create(<NumberPad size={9} dispatchNumber={fn} />).root;
    const button4 = wrapper.findAllByType("button")[3];
    button4.props.onClick();
    expect(fn).toHaveBeenCalledWith(4);
});
