import axios from "axios";

const getCollectionDocuments = async collectionId => {
  var path = `/collections/${collectionId}/documents`;

  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
};

const getDocument = async documentId => {
  var path = `/documents/${documentId}`;
  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
};

const deleteDocument = async documentId => {
  var path = `/documents/${documentId}`;
  return await axios
    .delete(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
};

export { getCollectionDocuments, getDocument, deleteDocument };
