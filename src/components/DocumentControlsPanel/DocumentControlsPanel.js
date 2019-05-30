import React, { useState } from "react";
import DocumentActions from "../DocumentActions/DocumentActions";
import DocumentEdit from "../DocumentEdit/DocumentEdit";

function DocumentControlsPanel(props) {
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

export default DocumentControlsPanel;
