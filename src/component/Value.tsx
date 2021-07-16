import * as React from "react";
import * as PropTypes from "prop-types";
import "./value.css";

export type ValueProps = {
    value: number;
};

const propTypes = {
    value: PropTypes.number.isRequired,
};

const Value = ({ value }: ValueProps): JSX.Element => {
    return (
        <svg
            className="sudoku__value"
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
};

Value.propTypes = propTypes;

export default Value;
