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

export async function patchDocument(document) {
  var path = `/documents/${document.id}`;
  var patchBody = JSON.stringify([
    { op: "replace", path: "/Name", value: document.name }
  ]);

  return await axios
    .patch(process.env.REACT_APP_API_URL + path, patchBody, {
      headers: { "Content-Type": "application/json-patch+json" }
    })
    .then(res => res.data);
}

export async function postDocument(document) {
  var path = "/documents";

  return await axios
    .post(process.env.REACT_APP_API_URL + path, document)
    .then(res => res.data);
}
