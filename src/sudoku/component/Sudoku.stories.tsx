import * as React from "react";
import { Story, Meta } from "@storybook/react";
import Sudoku, { SudokuProps } from "./Sudoku";

export default {
    title: "Sudoku/Board",
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

export const AlmostComplete = Template.bind({});
AlmostComplete.args = {
    sudoku: [
        [3, 7, 9, 0, 2, 4, 6, 5, 8],
        [8, 2, 4, 5, 6, 9, 1, 3, 7],
        [1, 6, 5, 3, 7, 8, 2, 4, 9],
        [5, 3, 1, 7, 4, 6, 8, 9, 2],
        [4, 8, 6, 2, 9, 3, 7, 1, 5],
        [2, 9, 7, 8, 1, 5, 3, 6, 4],
        [7, 4, 2, 9, 3, 1, 5, 8, 6],
        [9, 5, 3, 6, 8, 2, 4, 7, 1],
        [6, 1, 8, 4, 5, 7, 9, 2, 3],
    ],
};

export const Complete = Template.bind({});
Complete.args = {
    sudoku: [
        [3, 7, 9, 1, 2, 4, 6, 5, 8],
        [8, 2, 4, 5, 6, 9, 1, 3, 7],
        [1, 6, 5, 3, 7, 8, 2, 4, 9],
        [5, 3, 1, 7, 4, 6, 8, 9, 2],
        [4, 8, 6, 2, 9, 3, 7, 1, 5],
        [2, 9, 7, 8, 1, 5, 3, 6, 4],
        [7, 4, 2, 9, 3, 1, 5, 8, 6],
        [9, 5, 3, 6, 8, 2, 4, 7, 1],
        [6, 1, 8, 4, 5, 7, 9, 2, 3],
    ],
};
