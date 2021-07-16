import * as React from "react";
import { create } from "react-test-renderer";
import Stopwatch from "../../component/Stopwatch";

it("displays time correctly when it is a normal time", () => {
    const wrapper = create(
        <Stopwatch increment={() => {}} isPaused={true} time={4000} />
    ).root;
    expect(wrapper.findByType("div").children).toEqual(["66:40"]);
});

it("displays time correctly when it is too high", () => {
    const wrapper = create(
        <Stopwatch increment={() => {}} isPaused={true} time={6000} />
    ).root;
    expect(wrapper.findByType("div").children).toEqual(["99:59"]);
});
