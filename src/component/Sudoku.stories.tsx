import * as React from "react";
import { Story, Meta } from "@storybook/react";
import Sudoku, { SudokuProps } from "./Sudoku";
import { solved } from "../__tests__/__fixtures__/sudoku";

export default {
    title: "Sudoku/Sudoku",
    component: Sudoku,
} as Meta;

const Template: Story<SudokuProps> = (args) => <Sudoku {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    sudoku: solved[0].sudoku,
};
