import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Value from "../Value";
import "./cell.css";

export type CellProps = {
    onClick: () => void;
    value: number;
    hasSameValue?: boolean;
    isInSameHouse?: boolean;
    isInvalid?: boolean;
    isLocked?: boolean;
    isSelected?: boolean;
    notes: boolean[];
};

const propTypes = {
    /** The function to call when the cell button is clicked. */
    onClick: PropTypes.func.isRequired,

    /** The value of the cell in the Sudoku puzzle. */
    value: PropTypes.number.isRequired,

    /** Determines whether this cell has the same value as the currently selected cell. Affects styling. */
    hasSameValue: PropTypes.bool,

    /** Determines whether this cell is in the same house (row/column/square) as the currently selected cell. Affects styling. */
    isInSameHouse: PropTypes.bool,

    /** Determines whether this cell has an invalid value (conflicts with another cell in the same house). Affects styling. */
    isInvalid: PropTypes.bool,

    /** Determines whether this cell is locked (the cell is filled in the starting puzzle). Affects styling. */
    isLocked: PropTypes.bool,

    /** Determines whether this cell is currently selected. Affects styling. */
    isSelected: PropTypes.bool,

    /** The notes for the cell. */
    notes: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
};

const Cell: React.FC<CellProps> = ({
    onClick,
    value,
    hasSameValue,
    isInSameHouse,
    isSelected,
    isInvalid,
    isLocked,
    notes,
}) => {
    return (
        <button
            className={classNames("sudoku__cell", {
                sudoku__same_value: hasSameValue,
                sudoku__same_house: isInSameHouse,
                sudoku__selected: isSelected,
                sudoku__invalid: isInvalid,
                sudoku__locked: isLocked,
                sudoku__notes: value === 0,
            })}
            onClick={onClick}
        >
            {value === 0 ? (
                notes.map((note, index) => (
                    <Value
                        key={`value-${index + 1}`}
                        value={note ? index + 1 : 0}
                    />
                ))
            ) : (
                <Value value={value} />
            )}
        </button>
    );
};

Cell.propTypes = propTypes;

export default Cell;
