import React from "react";
import PropTypes from "prop-types";

export default function IconButton(props) {
  let { icon, onClick, color } = props;
  return (
    <button onClick={onClick}>
      {
        <i
          data-testid={props["data-testid"]}
          className={icon}
          style={{ color: color }}
        />
      }
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  "data-testid": PropTypes.string
};
