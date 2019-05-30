import { useState, useEffect } from "react";
import {
  getCollectionDocuments,
  getDocument,
  deleteDocument
} from "../../../api/DocManagerApi";

function useDocumentManagerState(collectionId) {
  let [documents, setDocuments] = useState(null);
  let [selectedDocument, setSelectedDocument] = useState(null);

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
      }
    })();
  }, [collectionId]);

  function updateCollectionDocument(collection, document) {
    setDocuments(collection.map(d => (d.id === document.id ? document : d)));
  }

  async function editDocument(document) {
    updateCollectionDocument(documents, document);
    await updateSelectedDocument(document);
  }

  async function updateSelectedDocument(document) {
    if (document.documentFile) {
      setSelectedDocument(document);
      return;
    }
    const documentWithFile = await getDocument(document.id);

    updateCollectionDocument(documents, documentWithFile);
    setSelectedDocument(documentWithFile);
  }

  async function deleteSelectedDocument() {
    await deleteDocument(selectedDocument.id);

    setDocuments(documents.filter(d => d.id !== selectedDocument.id));
    setSelectedDocument(null);

    return;
  }

  return {
    documents,
    selectedDocument,
    setSelectedDocument: updateSelectedDocument,
    deleteSelectedDocument,
    editDocument
  };
}

export { useDocumentManagerState };
