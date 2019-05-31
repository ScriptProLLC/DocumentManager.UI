import { useState, useEffect } from "react";
import {
  getCollectionDocuments,
  getDocument,
  deleteDocument
} from "../../../api/DocManagerApi";
import { scan } from "../../../api/ScanningApi";

function useDocumentManagerState(collectionId) {
  let [documents, setDocuments] = useState(null);
  let [selectedDocument, setSelectedDocument] = useState(null);
  let [activeDocument, setActiveDocument] = useState(null);

  useEffect(() => {
    (async () => {
      if (!collectionId) {
        return;
      }

      const collectionDocuments = await getCollectionDocuments(collectionId);
      setDocuments(collectionDocuments);

      if (collectionDocuments.length > 0) {
        const documentWithFile = await getDocument(collectionDocuments[0].id);
        updateCollectionDocument(collectionDocuments, documentWithFile);
        setSelectedDocument(documentWithFile);
        setActiveDocument(documentWithFile);
      }
    })();
  }, [collectionId]);

  function updateCollectionDocument(collection, document) {
    setDocuments(collection.map(d => (d.id === document.id ? document : d)));
  }

  async function editDocument(document) {
    updateCollectionDocument(documents, document);
    await updateActiveDocument(document);
  }

  async function updateActiveDocument(document) {
    if (document.documentFile) {
      setSelectedDocument(document);
      setActiveDocument(document);
      return;
    }
    const documentWithFile = await getDocument(document.id);

    updateCollectionDocument(documents, documentWithFile);
    setSelectedDocument(documentWithFile);
    setActiveDocument(documentWithFile);
  }

  async function deleteSelectedDocument() {
    await deleteDocument(selectedDocument.id);

    setDocuments(documents.filter(d => d.id !== selectedDocument.id));
    setSelectedDocument(null);
    setActiveDocument(null);

    return;
  }

  async function scanDocument() {
    let _scannedDocument = await scan();
    setActiveDocument({
      id: collectionId,
      name: "_TempScan",
      documentFile: _scannedDocument,
      dateCreated: Date().toLocaleString(),
      attributes: {}
    });
    return;
  }

  return {
    documents,
    setSelectedDocument: updateActiveDocument,
    deleteSelectedDocument,
    scanDocument,
    activeDocument,
    editDocument
  };
}

export { useDocumentManagerState };
