import * as React from "react";
import { Story, Meta } from "@storybook/react";
import { Cell, CellProps } from "./Cell";

export default {
    title: "Sudoku/Cell",
    component: Cell,
    args: {
        id: 5,
        hasSameValue: false,
        isInSameHouse: false,
        isSelected: false,
        onClick: () => {},
        value: 7,
    },
} as Meta;

const Template: Story<CellProps> = (args) => (
    <div style={{ width: "50px", height: "50px" }}>
        <Cell {...args} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    id: 5,
    onClick: () => {},
    value: 7,
};
