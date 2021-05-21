import * as React from "react";
import { Story, Meta } from "@storybook/react";
import Sudoku, { SudokuProps } from "./index";

export default {
    title: "Sudoku/Game",
    component: Sudoku,
} as Meta;

const Template: Story<SudokuProps> = (args) => <Sudoku {...args} />;

export const Primary = Template.bind({});
Primary.args = {
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
