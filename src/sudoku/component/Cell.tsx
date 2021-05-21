import * as React from "react";
import classNames from "classnames";
import { CellNotes } from "./reducer";
import styles from "./styles/Cell.module.scss";

export type CellProps = {
    id: number;
    hasSameValue?: boolean;
    isInSameHouse?: boolean;
    isLocked?: boolean;
    isSelected?: boolean;
    notes: CellNotes;
    onClick: (cell: number) => void;
    value: number;
};

export function Cell({
    id,
    hasSameValue,
    isInSameHouse,
    isLocked,
    isSelected,
    notes,
    onClick,
    value,
}: CellProps): JSX.Element {
    const cellClassName = classNames(
        styles.cell,
        { [styles.same_value]: hasSameValue },
        { [styles.same_house]: isInSameHouse },
        { [styles.selected]: isSelected },
        { [styles.notes]: value === 0 }
    );

    return (
        <button className={cellClassName} onClick={() => onClick(id)}>
            {value === 0 ? (
                notes.map((value, index) => (
                    <Value key={index} value={value ? index + 1 : 0} />
                ))
            ) : (
                <Value isLocked={isLocked} value={value} />
            )}
        </button>
    );
}

function Value({
    isLocked,
    value,
}: {
    isLocked?: boolean;
    value: number;
}): JSX.Element {
    const valueClassName = classNames(styles.value, {
        [styles.locked]: isLocked,
    });

    return (
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
    );
}
