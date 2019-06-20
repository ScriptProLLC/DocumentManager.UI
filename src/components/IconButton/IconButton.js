import React from "react";
import PropTypes from "prop-types";
import "./IconButton.scss";

/* Define Acceptable Icons, Colors and Sizes */
const ICON_TYPES = ["save", "pencil", "trash-o", "times", "upload"];
const COLOR_TYPES = ["primary", "white"];
const SIZE_TYPES = ["lg", "1x", "2x", "3x", "4x", "5x"];

export default function IconButton({
  icon,
  onClick,
  color,
  size,
  className,
  ...props
}) {
  /* Generate Class List */
  function classList() {
    /* Throw an error with invalid values */
    if (!ICON_TYPES.includes(icon)) {
      throw new Error("Unknown Icon: " + icon);
    }
    if (!COLOR_TYPES.includes(color)) {
      throw new Error("Unknown Color: " + color);
    }
    if (!SIZE_TYPES.includes(size)) {
      throw new Error("Unknown Size: " + size);
    }

    /* Return Class List */
    return (
      "icon-button " +
      ("fa fa-" + icon) +
      (" text-" + color) +
      (" fa-" + size) +
      (className ? " " + className : "")
    );
  }

  /* Template */
  return (
    <button
      className={classList()}
      aria-label={props["aria-label"]}
      onClick={onClick}
    />
  );
}

/* Prop Types */
IconButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(COLOR_TYPES),
  "aria-label": PropTypes.string,
  icon: PropTypes.oneOf(ICON_TYPES).isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(SIZE_TYPES)
};

/* Default Props */
IconButton.defaultProps = {
  color: "primary",
  size: "1x"
};
