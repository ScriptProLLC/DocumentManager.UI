import { useState, useEffect } from "react";
import {
  getCollectionDocuments,
  getDocument
} from "../../../api/DocManagerApi";

function useDocumentManagerState(collectionId) {
  let [documents, setDocuments] = useState(null);
  let [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    (async () => {
      const collectionDocuments = await getCollectionDocuments(collectionId);
      setDocuments(collectionDocuments);

      if (collectionDocuments.length > 0) {
        const documentWithFile = await getDocument(collectionDocuments[0].id);
        updateCollectionDocument(collectionDocuments, documentWithFile);
        setSelectedDocument(documentWithFile);
      }
    })();
  }, []);

  function updateCollectionDocument(collection, document) {
    const index = collection.findIndex(d => d.id === document.id);
    collection[index] = document;
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

  return [documents, selectedDocument, updateSelectedDocument];
}

export { useDocumentManagerState };