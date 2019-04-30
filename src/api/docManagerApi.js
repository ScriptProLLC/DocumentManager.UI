import axios from "axios";

const getDocuments = async collectionId => {
  var path = `/collections/${collectionId}/documents`;
  console.log(
    "retrieving documents at " + process.env.REACT_APP_API_URL + path
  );

  return axios.get(process.env.REACT_APP_API_URL + path).then(res => res.data);
};

export { getDocuments };
