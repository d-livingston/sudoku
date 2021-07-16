import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import "./banner.css";

export type BannerProps = {
    visible: boolean;
};

const propTypes = {
    /**  Whether the banner is visible or not. */
    visible: PropTypes.bool.isRequired,
};

const Banner = ({ visible }: BannerProps): JSX.Element => {
    return (
        <div
            className={classNames("sudoku__banner", {
                sudoku__banner_hidden: !visible,
            })}
        >
            <div className="sudoku__banner_title">Congratulations!</div>
            <div className="sudoku__banner_subtitle">
                You solved the puzzle!
            </div>
        </div>
    );
};

Banner.propTypes = propTypes;

export default Banner;
