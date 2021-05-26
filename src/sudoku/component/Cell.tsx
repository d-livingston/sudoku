import * as React from "react";
import classNames from "classnames";
import { CellNotes } from "./notes";
import styles from "./Cell.module.scss";

export type CellProps = {
    id: number;
    hasSameValue?: boolean;
    isInSameHouse?: boolean;
    isInvalid?: boolean;
    isLocked?: boolean;
    isSelected?: boolean;
    notes: CellNotes;
    onClick: (cell: number) => void;
    value: number;
};

export default function Cell({
    id,
    hasSameValue,
    isInSameHouse,
    isInvalid,
    isLocked,
    isSelected,
    notes,
    onClick,
    value,
}: CellProps): JSX.Element {
    const cellClassName = classNames(
        styles.cell,
        { [styles.locked]: isLocked },
        { [styles.invalid]: isInvalid && !isLocked },
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
                <Value value={value} />
            )}
        </button>
    );
}

export function Value({ value }: { value: number }): JSX.Element {
    return (
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
    );
}
