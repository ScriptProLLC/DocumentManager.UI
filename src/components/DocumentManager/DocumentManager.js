import React, { useState } from "react";
import "./DocumentManager.css";
import DocumentList from "../DocumentList/DocumentList";
import DocumentViewer from "../DocumentViewer/DocumentViewer";

function DocumentManager(props) {
  let docs = props.documents
    ? props.documents
    : [
        {
          id: "5b41a43f-d819-4c6f-b1bd-97327719113d",
          documentCollectionId: "030b9d08-e102-460c-882a-6b0d562aad29",
          name: "Document 1",
          documentFile: doc64,
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
          documentFile: doc64,
          dateCreated: "1997-01-09T09:37:15.25",
          attributes: {
            Pages: "4",
            "File Size": "622k"
          }
        },
        {
          id: "19d210f1-d1e1-4e0d-ab75-66343423",
          documentCollectionId: "030b9d08-e102-460c-882a-6b0d562aad29",
          name: "Document 3",
          documentFile: doc64,
          dateCreated: "1997-01-09T09:37:15.25",
          attributes: {
            Pages: "4",
            "File Size": "622k"
          }
        },
        {
          id: "19d210f1-d1e1-4e0d-ab75-1111222",
          documentCollectionId: "030b9d08-e102-460c-882a-6b0d562aad29",
          name: "Document 4",
          documentFile: doc64,
          dateCreated: "1997-01-09T09:37:15.25",
          attributes: {
            Pages: "4",
            "File Size": "622k"
          }
        },
        {
          id: "19d210f1-d1e1-4e0d-ab75-32432",
          documentCollectionId: "030b9d08-e102-460c-882a-6b0d562aad29",
          name: "Document 5",
          documentFile: doc64,
          dateCreated: "1997-01-09T09:37:15.25",
          attributes: {
            Pages: "4",
            "File Size": "622k"
          }
        }
      ];

  let [selectedDocument, setSelectedDocument] = useState(docs ? docs[0] : []);

  return (
    <div className="document-manager-container">
      <div className="document-list-pane">
        <div className="header" data-testid="document_list_header">
          Documents
        </div>
        <DocumentList
          documents={docs}
          onSelected={setSelectedDocument}
          selectedDoc={selectedDocument}
        />
      </div>
      <div className="document-viewer-pane">
        <div className="header" data-testid="document_viewer_header">
          Document Viewer
        </div>
        <DocumentViewer document={selectedDocument} />
      </div>
    </div>
  );
}

export default DocumentManager;

var doc64 = `JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog
  IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv
  TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K
  Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg
  L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+
  PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u
  dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq
  Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU
  CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu
  ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g
  CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw
  MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v
  dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G`;
