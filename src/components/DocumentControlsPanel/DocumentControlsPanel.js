import React, { useState } from "react";
import PropTypes from "prop-types";
import { documentPropType } from "../../propTypes";
import DocumentActions from "../DocumentActions/DocumentActions";
import DocumentEdit from "../DocumentEdit/DocumentEdit";

export default function DocumentControlsPanel(props) {
  return (
    <div>
      {props.inEditMode ? (
        <DocumentEdit
          document={props.document}
          dispatchDocumentAction={props.dispatchDocumentAction}
        />
      ) : (
        <DocumentActions
          document={props.document}
          dispatchDocumentAction={props.dispatchDocumentAction}
        />
      )}
    </div>
  );
}

DocumentControlsPanel.propTypes = {
  document: documentPropType,
  dispatchDocumentAction: PropTypes.func,
  inEditMode: PropTypes.bool
};
