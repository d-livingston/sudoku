import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Value from "./Value";
import "./cell.css";

export type CellProps = {
    onClick: () => void;
    value: number;
    hasSameValue?: boolean;
    isInSameHouse?: boolean;
    isInvalid?: boolean;
    isLocked?: boolean;
    isSelected?: boolean;
};

const propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    hasSameValue: PropTypes.bool,
    isInSameHouse: PropTypes.bool,
    isInvalid: PropTypes.bool,
    isLocked: PropTypes.bool,
    isSelected: PropTypes.bool,
};

const Cell: React.FC<CellProps> = ({
    onClick,
    value,
    hasSameValue,
    isInSameHouse,
    isSelected,
    isInvalid,
    isLocked,
}) => {
    return (
        <button
            className={classNames("sudoku__cell", {
                sudoku__same_value: hasSameValue,
                sudoku__same_house: isInSameHouse,
                sudoku__selected: isSelected,
                sudoku__invalid: isInvalid,
                sudoku__locked: isLocked,
            })}
            onClick={onClick}
        >
            <Value value={value} />
        </button>
    );
};

Cell.propTypes = propTypes;

export default Cell;
