import React from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton/IconButton";
import { ActionTypes } from "../DocumentManager/Model/ActionTypes";
import "./DocumentListToolbar.scss";

export default function DocumentListToolbar(props) {
  // Dispatch Actions
  const onScan = async () => {
    props.dispatchDocumentAction({
      type: ActionTypes.SCAN
    });
  };

  return (
    <section className="document-list-toolbar">
      <IconButton
        color="primary"
        onClick={onScan}
        icon="upload"
        size="2x"
        aria-label="Scan button"
      />
    </section>
  );
}

// Define PropTypes For Document List Toolbar
DocumentListToolbar.propTypes = {
  dispatchDocumentAction: PropTypes.func
};
