let mockGetCollectionDocuments;
let mockGetDocument;
let mockDeleteDocument;

function setup(functionName, mock) {
  switch (functionName) {
    case "getCollectionDocuments":
      mockGetCollectionDocuments = mock;
      break;

    case "getDocument":
      mockGetDocument = mock;
      break;

    case "deleteDocument":
      mockDeleteDocument = mock;
      break;

    default:
      throw new Error(`Invalid function name ${functionName}`);
  }
}

const getCollectionDocuments = async collectionId =>
  await mockGetCollectionDocuments(collectionId);

const getDocument = async documentId => await mockGetDocument(documentId);

const deleteDocument = async documentId => await mockDeleteDocument(documentId);

export { setup, getCollectionDocuments, getDocument, deleteDocument };
