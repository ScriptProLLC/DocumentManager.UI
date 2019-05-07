"use strict";

const mockData = require("./../tools/mockData");

const requestType = {
  GetCollectionDocuments: "getCollectionDocuments"
};

const getRequestType = url => {
  var path = url.replace(process.env.REACT_APP_API_URL, "");
  if (path.includes("/collections") && path.includes("/documents")) {
    return requestType.GetCollectionDocuments;
  }
};

const removeDocumentFiles = documents => {
  var documentsNoFile = [];
  for (var i = 0; i < documents.length; i++) {
    var processedDoc = documents[i];
    processedDoc.documentFile = null;
    documentsNoFile.push(processedDoc);
  }
  return documentsNoFile;
};

module.exports = {
  get: url => {
    if (getRequestType(url) === requestType.GetCollectionDocuments) {
      return Promise.resolve({ data: removeDocumentFiles(mockData.documents) });
    } else {
      return Promise.resolve({ data: mockData.documents[0] });
    }
  },
  post: () => {},
  patch: () => {},
  delete: () => {}
};
