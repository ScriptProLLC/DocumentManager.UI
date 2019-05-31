import React from "react";
import PropTypes from "prop-types";
import "./IconButton.scss";

export default function IconButton(props) {
  let { icon, onClick, color, size, className } = props;

  function classList() {
    return (
      "icon-button fa fa-" +
      icon +
      (color ? " text-" + color : " text-primary") +
      (size ? " fa-" + size : "") +
      (className ? " " + className : "")
    );
  }

  return (
    <button
      onClick={onClick}
      className={classList()}
      data-testid={props["data-testid"]}
    />
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "danger",
    "white"
  ]),
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  "data-testid": PropTypes.string
};
