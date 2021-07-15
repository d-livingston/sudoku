import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import "./banner.css";

export type BannerProps = {
    show: boolean;
};

const propTypes = {
    show: PropTypes.bool.isRequired,
};

const Banner: React.FC<BannerProps> = ({ show }) => {
    return (
        <div
            className={classNames("sudoku__banner", {
                sudoku__banner_hidden: !show,
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
