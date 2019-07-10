import React from "react";
import DocumentListItem from "../DocumentListItem/DocumentListItem";
import { documentPropType } from "../../propTypes";
import PropTypes from "prop-types";
import AppStates from "../DocumentManager/Model/AppStates";
import "./DocumentList.scss";

export default function DocumentList(props) {
  let docs = props.documents;

  // Log State
  function reportToggle(toggleState) {
    console.log(toggleState);
  }

  // Return Expanded Items
  function isExpanded(index) {
    if (props.expandedItems) {
      return (
        props.expandedItems.find(element => {
          return element === index + 1;
        }) !== undefined
      );
    }
  }

  // Render Document List Items
  var children = docs
    ? docs.map((doc, index) => (
        <li key={doc.id}>
          <DocumentListItem
            document={doc}
            dispatchDocumentAction={props.dispatchDocumentAction}
            reportToggle={reportToggle}
            isSelected={props.activeDoc ? doc.id === props.activeDoc.id : false}
            expanded={isExpanded(index)}
          />
        </li>
      ))
    : null;

  return (
    <section
      className="document-list-container"
      aria-label="Document list container"
    >
      {props.appState === AppStates.NO_DOCUMENTS ? (
        <div
          aria-label="Document list with no documents"
          className="document-list-empty"
        >
          No documents present
        </div>
      ) : (
        <ul aria-label="Document list with documents">{children}</ul>
      )}
    </section>
  );
}

// Define PropTypes For Document List
DocumentList.propTypes = {
  documents: PropTypes.arrayOf(documentPropType),
  activeDoc: documentPropType,
  dispatchDocumentAction: PropTypes.func,
  expandedItems: PropTypes.arrayOf(PropTypes.number),
  appState: PropTypes.object
};
