import React from "react";
import PropTypes from "prop-types";
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

DocumentActions.propTypes = {
  // would suggest just passing in documentName alone if that's the only property used in this component.
  document: PropTypes.shape({
    name: PropTypes.string
  })
};

DocumentActions.defaultProps = {
  document: { name: "" }
};

export default DocumentActions;
