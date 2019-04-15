const data = require("./../../tools/mockData");

function createTestDocument(overrideObject) {
  var localDoc = Object.assign({}, data.documents[0]);
  return overrideObject ? Object.assign(localDoc, overrideObject) : localDoc;
}

module.exports = {
  createTestDocument
};
