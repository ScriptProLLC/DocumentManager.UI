import React from "react";
import "font-awesome/css/font-awesome.min.css";
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
      <ul data-testid="documentListItems">{children}</ul>
    </div>
  );
}

export default DocumentList;
