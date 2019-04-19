import React, { useState } from "react";
import "./DocumentManager.css";
import DocumentList from "../DocumentList/DocumentList";

function DocumentManager(props) {
  let docs = [
    {
      id: "5b41a43f-d819-4c6f-b1bd-97327719113d",
      documentCollectionId: "030b9d08-e102-460c-882a-6b0d562aad29",
      name: "Document 1",
      documentFile: "Base64StringHere1",
      dateCreated: "1997-01-01T06:30:16.25",
      attributes: {
        Pages: "3",
        "File Size": "543k"
      }
    },
    {
      id: "19d210f1-d1e1-4e0d-ab75-54b69ffaf4ed",
      documentCollectionId: "030b9d08-e102-460c-882a-6b0d562aad29",
      name: "Document 2",
      documentFile: "Base64StringHere1",
      dateCreated: "1997-01-09T09:37:15.25",
      attributes: {
        Pages: "4",
        "File Size": "622k"
      }
    }
  ];

  let [selectedDocument, setSelectedDocument] = useState(docs[0]);

  return (
    <div className="document-manager-container">
      <h1>Scriptpro Document Manager</h1>
      <div className="document-list-pane">
        <h3>Documents</h3>
        <DocumentList
          documents={docs}
          onSelected={setSelectedDocument}
          selectedDoc={selectedDocument}
        />
      </div>
    </div>
  );
}

export default DocumentManager;
