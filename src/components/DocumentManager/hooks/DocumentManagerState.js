import { useState, useEffect } from "react";
import * as docApi from "../../../api/DocManagerApi";
import * as scanApi from "../../../api/ScanningApi";

function useDocumentManagerState(collectionId) {
  let [documents, setDocuments] = useState(null);
  let [selectedDocument, setSelectedDocument] = useState(null);
  let [activeDocument, setActiveDocument] = useState(null);
  let [loading, setLoading] = useState(true);
  let [inEditMode, setInEditMode] = useState(false);
  let [modeMessage, setModeMessage] = useState("Document Viewer");

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

  async function updateEditMode(editMode) {
    if (editMode === false) {
      setActiveDocument(selectedDocument);
      setModeMessage("Document Viewer");
    }

    setInEditMode(editMode);
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
    setModeMessage("Scan Preview");

    setActiveDocument({
      id: null,
      documentCollectionId: collectionId,
      documentFile: scannedDocument.scanFile
    });
    setSelectedDocument(null);
    setInEditMode(true);
    return;
  }

  async function insertNewDocument(document) {
    let clone = await docApi.postDocument(document);
    clone.documentFile = document.documentFile;

    updateCollectionDocument(documents, clone);
    await updateActiveDocument(clone);

    setDocuments([...documents, clone]);
  }

  async function saveDocument(document) {
    if (document.id === null) {
      insertNewDocument(document);
    } else {
      updateCollectionDocument(documents, document);
      await docApi.patchDocument(document);
    }

    await updateActiveDocument(document);
    setInEditMode(false);
    setModeMessage("Document Viewer");
  }

  return {
    documents,
    setSelectedDocument: updateActiveDocument,
    deleteSelectedDocument,
    scanDocument,
    activeDocument,
    loading,
    inEditMode,
    updateEditMode,
    modeMessage,
    saveDocument
  };
}

export { useDocumentManagerState };
