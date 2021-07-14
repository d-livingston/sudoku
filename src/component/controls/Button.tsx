import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import "./button.css";

export type ButtonProps = {
    className?: string;
    onClick: () => void;
};

const propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => (
    <button
        className={classNames("sudoku__control_btn", className)}
        onClick={onClick}
    >
        {children}
    </button>
);

Button.propTypes = propTypes;

export default Button;
