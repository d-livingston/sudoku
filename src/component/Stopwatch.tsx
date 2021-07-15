import * as React from "react";
import * as PropTypes from "prop-types";
import "./stopwatch.css";

export type StopwatchProps = {
    increment: () => void;
    isSolved: boolean;
    time: number;
};

const propTypes = {
    increment: PropTypes.func.isRequired,
    time: PropTypes.number.isRequired,
    isSolved: PropTypes.bool.isRequired,
};

function getTime(time: number): string {
    if (time > 5999) return "99:59";
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
}

const Stopwatch: React.FC<StopwatchProps> = ({ isSolved, increment, time }) => {
    React.useEffect(() => {
        let interval = setInterval(() => {}, 1000);
        clearInterval(interval);

        if (!isSolved) {
            interval = setInterval(increment, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    });

    return <div className="sudoku__stopwatch">{getTime(time)}</div>;
};

Stopwatch.propTypes = propTypes;

export default Stopwatch;
