import * as React from "react";
import { Story, Meta } from "@storybook/react";
import { Component, ComponentProps } from "./Component";

export default {
    title: "Sudoku",
    component: Component,
} as Meta;

const Template: Story<ComponentProps> = (args) => <Component {...args} />;

export const FullSudoku = Template.bind({});
FullSudoku.args = {
    sudoku: [
        [9, 0, 7, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 3, 0, 0, 8, 9],
        [0, 0, 0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 5, 0, 0, 0],
        [0, 0, 4, 3, 0, 0, 5, 2, 8],
        [1, 0, 8, 0, 6, 0, 7, 0, 0],
        [7, 0, 6, 0, 5, 3, 0, 4, 0],
        [5, 0, 0, 0, 0, 0, 6, 3, 0],
    ],
};
