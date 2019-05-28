import axios from "axios";

export async function getCollectionDocuments(collectionId) {
  var path = `/collections/${collectionId}/documents`;

  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
}

export async function getDocument(documentId) {
  var path = `/documents/${documentId}`;

  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
}

export async function deleteDocument(documentId) {
  var path = `/documents/${documentId}`;

  return await axios
    .delete(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
}
