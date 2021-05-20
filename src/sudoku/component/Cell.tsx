import * as React from "react";
import classNames from "classnames";
import styles from "./styles/Cell.module.scss";

export type CellProps = {
    id: number;
    hasSameValue?: boolean;
    isInSameHouse?: boolean;
    isSelected?: boolean;
    onClick: (cell: number) => void;
    value: number;
};

export function Cell({
    id,
    hasSameValue,
    isInSameHouse,
    isSelected,
    onClick,
    value,
}: CellProps): JSX.Element {
    const className = classNames(
        styles.cell,
        { [styles.same_value]: hasSameValue },
        { [styles.same_house]: isInSameHouse },
        { [styles.selected]: isSelected }
    );

    return (
        <button className={className} onClick={() => onClick(id)}>
            <svg
                className={styles.value}
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
