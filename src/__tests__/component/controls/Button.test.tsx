import * as React from "react";
import { create } from "react-test-renderer";
import Button from "../../../component/controls/Button";

it("renders a button", () => {
    const wrapper = create(<Button onClick={() => {}} />).root;
    expect(wrapper.findByType("button"));
});

it("adds a custom class name", () => {
    const wrapper = create(<Button className="test" onClick={() => {}} />).root;
    expect(wrapper.findByType("button").props.className).toMatch("test");
});

it("adds children inside the button", () => {
    const wrapper = create(
        <Button onClick={() => {}}>
            <div></div>
        </Button>
    ).root;
    expect(wrapper.findByType("div"));
});

it("calls the onClick function when clicked", () => {
    const onClick = jest.fn();
    const wrapper = create(<Button onClick={onClick} />).root;
    wrapper.findByType("button").props.onClick();
    expect(onClick).toHaveBeenCalled();
});
