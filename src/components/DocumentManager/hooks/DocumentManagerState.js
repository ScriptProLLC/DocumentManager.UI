import { useState, useEffect } from "react";
import {
  getCollectionDocuments,
  getDocument
} from "../../../api/DocManagerApi";

function useDocumentManagerState(collectionId) {
  let [documents, setDocuments] = useState(null);
  // TODO: Suggest storing only the selectedDocument's id here. Doing so avoids having the full data in two spots, which reduces memory usage and avoids the risk of out of sync
  // between the two datasets.
  let [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const docs = await getCollectionDocuments(collectionId);
        if (docs.length > 0) {
          const doc = await getDocument(docs[0].id);
          updateState(docs, doc);
        }
      } catch (error) {
        alert("Loading documents failed. Please try reloading your browser.");
      }
    })();
  }, [collectionId]);

  function updateState(docs, doc) {
    setDocuments(docs.map(d => (d.id === doc.id ? doc : d)));
    setSelectedDocument(doc);
  }

  async function updateSelectedDocument(document) {
    if (document.documentFile) {
      setSelectedDocument(document);
      return;
    }

    try {
      const doc = await getDocument(document.id);
      updateState(documents, doc);
    } catch (error) {
      alert("Loading document failed. Please try reloading your browser.");
    }
  }

  return [documents, selectedDocument, updateSelectedDocument];
}

export { useDocumentManagerState };
