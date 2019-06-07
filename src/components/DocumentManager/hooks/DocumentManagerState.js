import { useState, useEffect } from "react";
import * as docApi from "../../../api/DocManagerApi";
import * as scanApi from "../../../api/ScanningApi";

function useDocumentManagerState(collectionId) {
  let [documents, setDocuments] = useState(null);
  let [selectedDocument, setSelectedDocument] = useState(null);
  let [activeDocument, setActiveDocument] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!collectionId) {
        return;
      }

      const collectionDocuments = await docApi.getCollectionDocuments(
        collectionId
      );
      setDocuments(collectionDocuments);

      if (collectionDocuments.length > 0) {
        const documentWithFile = await docApi.getDocument(
          collectionDocuments[0].id
        );
        updateCollectionDocument(collectionDocuments, documentWithFile);
        setSelectedDocument(documentWithFile);
        setActiveDocument(documentWithFile);
      }

      setLoading(false);
    })();
  }, [collectionId]);

  function updateCollectionDocument(collection, document) {
    setDocuments(collection.map(d => (d.id === document.id ? document : d)));
  }

  async function editDocument(document) {
    updateCollectionDocument(documents, document);
    await updateActiveDocument(document);
    await docApi.patchDocument(document);
  }

  async function updateActiveDocument(document) {
    if (document.documentFile) {
      setSelectedDocument(document);
      setActiveDocument(document);
      return;
    }
    setLoading(true);
    const documentWithFile = await docApi.getDocument(document.id);
    setLoading(false);

    updateCollectionDocument(documents, documentWithFile);
    setSelectedDocument(documentWithFile);
    setActiveDocument(documentWithFile);
  }

  async function deleteSelectedDocument() {
    await docApi.deleteDocument(selectedDocument.id);

    setDocuments(documents.filter(d => d.id !== selectedDocument.id));
    setSelectedDocument(null);
    setActiveDocument(null);

    return;
  }

  async function scanDocument() {
    let scannedDocument = await scanApi.scan();
    setActiveDocument({
      id: null,
      documentCollectionId: collectionId,
      name: "_TempScan",
      documentFile: scannedDocument.scanFile,
      dateCreated: null,
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
    editDocument,
    loading
  };
}

export { useDocumentManagerState };
