import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./DocumentActions.css";

function DocumentActions(props) {
  let documentName =
    props.document && props.document.name ? props.document.name : String.Empty;

  return (
    <div className="document-actions-container">
      <span data-testid="documentActionDocumentName">{documentName}</span>
    </div>
  );
}

export default DocumentActions;
