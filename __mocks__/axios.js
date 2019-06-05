"use strict";

var collection = [];
var document = {};

const requestType = {
  GetCollectionDocuments: "getCollectionDocuments"
};

const getRequestType = url => {
  var path = url.replace(process.env.REACT_APP_API_URL, "");
  if (path.includes("/collections") && path.includes("/documents")) {
    return requestType.GetCollectionDocuments;
  }
};

module.exports = {
  get: url => {
    if (getRequestType(url) === requestType.GetCollectionDocuments) {
      return Promise.resolve({ data: collection });
    } else {
      return Promise.resolve({ data: document });
    }
  },
  post: () => {},
  patch: () => {},
  delete: () => {},
  setCollection: c => {
    collection = c;
  }
};
