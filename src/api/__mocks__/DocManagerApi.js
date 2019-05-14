let mockGetCollectionDocuments;
let mockGetDocument;

function setup(functionName, mock) {
  switch (functionName) {
    case "getCollectionDocuments":
      mockGetCollectionDocuments = mock;
      break;

    case "getDocument":
      mockGetDocument = mock;
      break;

    default:
    // Throw some sort of error -- I'm getting linting problems when I throw a string.
  }
}

const getCollectionDocuments = async collectionId =>
  await mockGetCollectionDocuments(collectionId);

const getDocument = async documentId => await mockGetDocument(documentId);

export { setup, getCollectionDocuments, getDocument };
