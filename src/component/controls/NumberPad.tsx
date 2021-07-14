import * as React from "react";
import * as PropTypes from "prop-types";
import Button from "./Button";
import Value from "../Value";
import "./numberPad.css";

export type NumberPadProps = {
    size: number;
    dispatchFill: (value: number) => void;
};

const propTypes = {
    size: PropTypes.number.isRequired,
    dispatchFill: PropTypes.func.isRequired,
};

const NumberPad: React.FC<NumberPadProps> = ({ dispatchFill, size }) => {
    return (
        <div className="sudoku__number_pad">
            {Array.from({ length: size }, (_, i) => (
                <Button onClick={() => dispatchFill(i + 1)}>
                    <Value value={i + 1} />
                </Button>
            ))}
        </div>
    );
};

NumberPad.propTypes = propTypes;

export default NumberPad;
