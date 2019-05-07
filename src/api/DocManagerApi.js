import axios from "axios";

const getCollectionDocuments = async collectionId => {
  var path = `/collections/${collectionId}/documents`;
  console.log(
    "retrieving collection documents at " + process.env.REACT_APP_API_URL + path
  );

  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
};

const getDocument = async documentId => {
  var path = `/documents/${documentId}`;
  console.log("retrieving document at " + process.env.REACT_APP_API_URL + path);
  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data);
};

export { getCollectionDocuments, getDocument };
