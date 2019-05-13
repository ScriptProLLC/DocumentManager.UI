// TODO: Why not use an ES import?
const data = require("./../../tools/mockData");

function createTestDocument(overrideObject) {
  var localDoc = Object.assign({}, data.documents[0]);
  localDoc.id = generateGuid();
  return overrideObject ? Object.assign(localDoc, overrideObject) : localDoc;
}

function createTestCollectionDocument(overrideObject) {
  var localDoc = Object.assign({}, data.documents[0]);
  localDoc.id = generateGuid();
  localDoc.documentFile = null;
  return overrideObject ? Object.assign(localDoc, overrideObject) : localDoc;
}

function createTestDocumentList(length, overrideObject) {
  var docs = [];
  for (var i = 0; i < length; i++) {
    docs.push(createTestDocument({ name: `Document ${i + 1}` }));
  }

  return overrideObject ? Object.assign(docs, overrideObject) : docs;
}

function generateGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

// TODO: Why not use the export keyword on the public function above?
module.exports = {
  createTestDocument,
  createTestCollectionDocument,
  createTestDocumentList
};
