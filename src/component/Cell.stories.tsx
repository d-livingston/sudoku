import * as React from "react";
import { Story, Meta } from "@storybook/react";
import Cell, { CellProps } from "./Cell";
import "./globals.css";

export default {
    title: "Sudoku/Cell",
    component: Cell,
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    id: 33,
    selectCell: () => {},
    value: 5,
};
