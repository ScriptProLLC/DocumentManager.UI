import React, { useState } from "react";
import PropTypes from "prop-types";
import { documentPropType } from "../../propTypes";
import DocumentActions from "../DocumentActions/DocumentActions";
import DocumentEdit from "../DocumentEdit/DocumentEdit";

export default function DocumentControlsPanel(props) {
  let [inEditMode, setInEditMode] = useState(false);

  return (
    <div>
      {inEditMode ? (
        <DocumentEdit
          document={props.document}
          setInEditMode={setInEditMode}
          dispatchDocumentAction={props.dispatchDocumentAction}
        />
      ) : (
        <DocumentActions
          document={props.document}
          setInEditMode={setInEditMode}
          dispatchDocumentAction={props.dispatchDocumentAction}
        />
      )}
    </div>
  );
}

DocumentControlsPanel.propTypes = {
  document: documentPropType,
  dispatchDocumentAction: PropTypes.func
};
