import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import "./button.css";

export type ButtonProps = {
    className?: string;
    children?: React.ReactNode;
    onClick: () => void;
};

const propTypes = {
    /**
     * An optional class to include for the Button.
     *
     * @type {string}
     */
    className: PropTypes.string,

    /**
     * Optional children to include within the Button
     *
     * @type {React.ReactNode}
     */
    children: PropTypes.node,

    /**
     * The onClick event handler for the Button.
     *
     * @callback
     */
    onClick: PropTypes.func.isRequired,
};

const Button = ({ children, onClick, className }: ButtonProps): JSX.Element => (
    <button
        className={classNames("sudoku__control_btn", className)}
        onClick={onClick}
    >
        {children}
    </button>
);

Button.propTypes = propTypes;

export default Button;
