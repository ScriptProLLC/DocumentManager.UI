import React from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton/IconButton";
import "./DocumentListToolbar.scss";
import { ActionTypes } from "../DocumentManager/Model/ActionTypes";

export default function DocumentListToolbar(props) {
  const onScan = async () => {
    props.dispatchDocumentAction({
      type: ActionTypes.SCAN
    });
  };

  return (
    <div className="document-list-toolbar">
      <IconButton
        color="primary"
        onClick={onScan}
        icon="upload"
        size="2x"
        data-testid="scan_icon_button"
      />
    </div>
  );
}

DocumentListToolbar.propTypes = {
  dispatchDocumentAction: PropTypes.func
};
