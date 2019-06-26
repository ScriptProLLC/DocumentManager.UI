var collection = [];
var document = {};
var scannedDocument = {};

const requestType = {
  GetCollectionDocuments: "getCollectionDocuments",
  NewDocumentScan: "newDocumentScan"
};

const getRequestType = url => {
  if (url === process.env.REACT_APP_API_SCANNER_URL) {
    return requestType.NewDocumentScan;
  }
  var path = url.replace(process.env.REACT_APP_API_URL, "");
  if (path.includes("/collections") && path.includes("/documents")) {
    return requestType.GetCollectionDocuments;
  }
};

module.exports = {
  get: url => {
    if (getRequestType(url) === requestType.GetCollectionDocuments) {
      return Promise.resolve({ data: collection });
    } else if (getRequestType(url) === requestType.NewDocumentScan) {
      return Promise.resolve({ data: scannedDocument });
    } else {
      return Promise.resolve({ data: document });
    }
  },
  post: () => {
    return Promise.resolve({ data: document });
  },
  patch: () => {},
  delete: () => {
    return Promise.resolve({ data: {} });
  },
  setDocument: d => {
    document = d;
  },
  setCollection: c => {
    collection = c;
  },
  setScannedDocument: d => {
    scannedDocument = d;
  }
};
