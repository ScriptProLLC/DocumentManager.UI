import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./DocumentActions.css";

function DocumentActions(props) {
  return (
    <div className="document-actions-container">
      <span data-testid="documentActionDocumentName">
        {props.document.name}
      </span>
    </div>
  );
}

export default DocumentActions;
