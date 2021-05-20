import * as React from "react";
import classNames from "classnames";
import styles from "./styles/Cell.module.scss";

export type CellProps = {
    id: number;
    hasSameValue?: boolean;
    isInSameHouse?: boolean;
    isLocked?: boolean;
    isSelected?: boolean;
    onClick: (cell: number) => void;
    value: number;
};

export function Cell({
    id,
    hasSameValue,
    isInSameHouse,
    isLocked,
    isSelected,
    onClick,
    value,
}: CellProps): JSX.Element {
    const cellClassName = classNames(
        styles.cell,
        { [styles.same_value]: hasSameValue },
        { [styles.same_house]: isInSameHouse },
        { [styles.selected]: isSelected }
    );
    const valueClassName = classNames(styles.value, {
        [styles.locked]: isLocked,
    });

    return (
        <button className={cellClassName} onClick={() => onClick(id)}>
            <svg
                className={valueClassName}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="1px"
            >
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                >
                    {value !== 0 && value}
                </text>
            </svg>
        </button>
    );
}
