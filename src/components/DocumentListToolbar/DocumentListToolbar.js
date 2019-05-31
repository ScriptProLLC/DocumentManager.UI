import React from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton/IconButton";

function DocumentListToolbar(props) {
  const onScan = async () => {
    props.dispatchDocumentAction({
      type: "scanAction"
    });
  };

  return (
    <IconButton color={null} onClick={onScan} icon={"fa fa-file-image-o"} />
  );
}

DocumentListToolbar.propTypes = {
  dispatchDocumentAction: PropTypes.func
};

export default DocumentListToolbar;
