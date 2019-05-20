import React from "react";
import DocumentListItem from "../DocumentListItem/DocumentListItem";
import "./DocumentList.scss";

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

  function parseDateNoInvalid(stringDate) {
    var dt = new Date(stringDate);

    return isNaN(dt.getTime()) ? 0 : dt.getTime();
  }

  function byDateDescending(doc1, doc2) {
    return (
      parseDateNoInvalid(doc2.dateCreated) -
      parseDateNoInvalid(doc1.dateCreated)
    );
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
        <ul data-testid="documentListItems">{children}</ul>
      )}
    </div>
  );
}

export default DocumentList;
