import React from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton/IconButton";
import "./DocumentListToolbar.scss";

function DocumentListToolbar(props) {
  const onScan = async () => {
    props.dispatchDocumentAction({
      type: "scanAction"
    });
  };

  return (
    <div className="document-list-toolbar">
      <IconButton color="primary" onClick={onScan} icon="upload" size="2x" />
    </div>
  );
}

DocumentListToolbar.propTypes = {
  dispatchDocumentAction: PropTypes.func
};

export default DocumentListToolbar;
