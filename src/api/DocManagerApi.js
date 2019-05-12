import axios from "axios";

export async function getCollectionDocuments(collectionId) {
  var path = `/collections/${collectionId}/documents`;
  console.log(
    "retrieving collection documents at " + process.env.REACT_APP_API_URL + path
  );

  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
}

export async function getDocument(documentId) {
  var path = `/documents/${documentId}`;
  console.log("retrieving document at " + process.env.REACT_APP_API_URL + path);
  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
}
