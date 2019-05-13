import React from "react";
import { documentPropType } from "../../propTypes";
import "./DocumentActions.css";

function DocumentActions(props) {
  // TODO: Why render this at all without a document? Suggest requiring document and only rendering when a document is available.
  let documentName =
    props.document && props.document.name ? props.document.name : String.Empty;

  return (
    <div className="document-actions-container">
      <span data-testid="documentActionDocumentName">{documentName}</span>
    </div>
  );
}

DocumentActions.propTypes = {
  // TODO: Suggest just passing in documentName alone if that's the only property used in this component.
  document: documentPropType
};

export default DocumentActions;
