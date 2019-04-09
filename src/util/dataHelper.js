function createTestDocument(overrideObject) {
  var document = {
    Name: "name",
    DateCreated: "01/01/1970 09:22 AM",
    Attributes: { attr1: "Hello", attr2: "World" }
  };

  return overrideObject ? Object.assign(document, overrideObject) : document;
}

function createStoryDocument(overrideObject) {
  var document = {
    Name: "Document Name",
    DateCreated: "01/01/1970 09:22 AM",
    Attributes: {
      pages: "3",
      fileSize: "543K"
    }
  };

  return overrideObject ? Object.assign(document, overrideObject) : document;
}

module.exports = {
  createTestDocument,
  createStoryDocument
};
