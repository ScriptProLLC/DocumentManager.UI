import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./DocumentList.css";
import DocumentListItem from "./../document-list-item/document-list-item";

function DocumentList(props) {
  let docs = props.documents;

  function onSelected(data) {
    console.log(data);
  }

  function reportToggle(toggleState) {
    console.log(toggleState);
  }

  var children = Object.entries(docs).map(([key, value], index) => (
    <li key={key}>
      <DocumentListItem
        key={key}
        index={index}
        document={value}
        onSelected={onSelected}
        reportToggle={reportToggle}
        data-testid={key}
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
