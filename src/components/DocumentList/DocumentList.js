import React from "react";
import PropTypes from "prop-types";
import { documentPropType } from "../../propTypes";
import "./DocumentList.css";
import DocumentListItem from "../DocumentListItem";

function DocumentList(props) {
  let docs = props.documents;

  function onSelected(data) {
    // Why check for this? It should be required, since it's necessary for the app to work.
    if (props.onSelected) {
      props.onSelected(data);
    }
  }

  function reportToggle(toggleState) {
    console.log(toggleState);
  }

  var children = docs
    ? docs.map(doc => (
        <li key={doc.id} data-testid={doc.id}>
          <DocumentListItem
            document={doc}
            onSelected={onSelected}
            reportToggle={reportToggle}
            isSelected={props.selectedDoc && doc.id === props.selectedDoc.id}
          />
        </li>
      ))
    : null;

  return (
    <div className="document-list-container">
      <ul data-testid="documentListItems">{children}</ul>
    </div>
  );
}

DocumentList.propTypes = {
  documents: PropTypes.arrayOf(documentPropType).isRequired,
  selectedDoc: documentPropType,
  onSelected: PropTypes.func
};

export default DocumentList;
