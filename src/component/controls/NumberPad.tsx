import * as React from "react";
import * as PropTypes from "prop-types";
import Button from "./Button";
import Value from "../Value";
import "./numberPad.css";

export type NumberPadProps = {
    size: number;
    dispatchNumber: (value: number) => void;
};

const propTypes = {
    /** The size of the Sudoku puzzle. Answers how many numbers should be included in the number pad. Default is 9. */
    size: PropTypes.number.isRequired,

    /** A custom function calling when the number button is clicked. */
    dispatchNumber: PropTypes.func.isRequired,
};

const NumberPad: React.FC<NumberPadProps> = ({ dispatchNumber, size = 9 }) => {
    return (
        <div className="sudoku__number_pad">
            {Array.from({ length: size }, (_, i) => (
                <Button
                    key={`number-${i + 1}`}
                    onClick={() => dispatchNumber(i + 1)}
                >
                    <Value value={i + 1} />
                </Button>
            ))}
        </div>
    );
};

NumberPad.propTypes = propTypes;

export default NumberPad;
