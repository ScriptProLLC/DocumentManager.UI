import React from "react";
import PropTypes from "prop-types";
import "font-awesome/css/font-awesome.min.css";
import "./Icon.css";

const Icon = ({ type }) => {
  function getIcon() {
    switch (type) {
      case "info":
        return <i className="fa fa-2x fa-info-circle icon__info" />;

      case "warning":
        return (
          <>
            <i className="fa fa-exclamation fa-stack-2x fa-inverse icon__warning--exclamation" />
            <i className="fa fa-exclamation-triangle fa-stack-2x icon__warning" />
          </>
        );

      case "error":
        return <i className="fa fa-times fa-stack-2x icon__error" />;

      case "caret-down":
        return <i className="fa fa-caret-down fa-lg" />;

      case "caret-right":
        return <i className="fa fa-caret-right fa-lg" />;

      case "file":
        return <i className="fa file" />;

      case "file-o":
        return <i className="fa file-o" />;

      default:
        throw new Error("Unknown type: " + type);
    }
  }

  return <span className="icon-shown fa-stack fa-lg">{getIcon()}</span>;
};

Icon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    "info",
    "warning",
    "error",
    "caret-down",
    "caret-right",
    "file",
    "file-o"
  ])
};

export default Icon;
