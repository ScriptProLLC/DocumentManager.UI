import React from "react";
import DocumentListItem from "../DocumentListItem/DocumentListItem";
import "./DocumentList.scss";
import { documentPropType } from "../../propTypes";
import PropTypes from "prop-types";
import AppStates from "../DocumentManager/Model/AppStates";

export default function DocumentList(props) {
  let docs = props.documents;

  function reportToggle(toggleState) {
    console.log(toggleState);
  }

  function isExpanded(index) {
    if (props.expandedItems) {
      return (
        props.expandedItems.find(element => {
          return element === index + 1;
        }) !== undefined
      );
    }
  }

  var children = docs
    ? docs.map((doc, index) => (
        <li key={doc.id} data-testid={doc.id}>
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
    <div
      className="document-list-container"
      data-testid="document_list_container"
    >
      {props.appState === AppStates.NO_DOCUMENTS ? (
        <div
          data-testid="document_list_no_documents"
          className="document-list-empty"
        >
          No documents present
        </div>
      ) : (
        <ul data-testid="document_list_items">{children}</ul>
      )}
    </div>
  );
}

DocumentList.propTypes = {
  documents: PropTypes.arrayOf(documentPropType),
  activeDoc: documentPropType,
  dispatchDocumentAction: PropTypes.func,
  expandedItems: PropTypes.arrayOf(PropTypes.number),
  appState: PropTypes.object
};
