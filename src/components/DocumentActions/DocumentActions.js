import React from "react";
import "./DocumentActions.scss";

function DocumentActions(props) {
  let documentName =
    props.document && props.document.name ? props.document.name : String.Empty;

  return (
    <div className="document-actions-container">
      <span data-testid="document_action_document_name">{documentName}</span>
    </div>
  );
}

export default DocumentActions;
