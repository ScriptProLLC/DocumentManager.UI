import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./DocumentList.css";
import DocumentListItem from "../DocumentListItem/DocumentListItem";

function DocumentList(props) {
  let docs = props.documents;

  function onSelected(data) {
    console.log(data);
  }

  function reportToggle(toggleState) {
    console.log(toggleState);
  }

  var children = docs.map(doc => (
    <li key={doc.id} data-testid={doc.id}>
      <DocumentListItem
        document={doc}
        onSelected={onSelected}
        reportToggle={reportToggle}
      />
    </li>
  ));

  return (
    <div className="document-list-container">
      <ul>{children}</ul>
    </div>
  );
}

export default DocumentList;
