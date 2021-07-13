import * as React from "react";
import { Story, Meta } from "@storybook/react";
import Square, { SquareProps } from "./Square";
import "./globals.css";

export default {
    title: "Sudoku/Square",
    component: Square,
} as Meta;

const Template: Story<SquareProps> = (args) => <Square {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    cells: [
        { cell: 0, value: 5 },
        { cell: 1, value: 0 },
        { cell: 2, value: 1 },
        { cell: 9, value: 0 },
        { cell: 10, value: 3 },
        { cell: 11, value: 4 },
        { cell: 18, value: 0 },
        { cell: 19, value: 7 },
        { cell: 20, value: 0 },
    ],
    selectCell: (_: number) => {},
};
