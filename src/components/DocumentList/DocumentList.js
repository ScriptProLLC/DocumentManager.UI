import React from "react";
import DocumentListItem from "../DocumentListItem/DocumentListItem";
import "./DocumentList.scss";
import { byDateDescending } from "../../util/dateUtilities";

function DocumentList(props) {
  let docs = props.documents;

  function onSelected(data) {
    if (props.onSelected) {
      props.onSelected(data);
    }
  }

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
    ? docs.sort(byDateDescending).map((doc, index) => (
        <li key={doc.id} data-testid={doc.id}>
          <DocumentListItem
            document={doc}
            onSelected={onSelected}
            reportToggle={reportToggle}
            isSelected={
              props.selectedDoc ? doc.id === props.selectedDoc.id : false
            }
            expanded={isExpanded(index)}
          />
        </li>
      ))
    : null;

  return (
    <div className="document-list-container">
      {!docs || docs.length === 0 ? (
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

export default DocumentList;
