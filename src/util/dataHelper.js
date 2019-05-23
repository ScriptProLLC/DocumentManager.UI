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

function createMixedDateDocumentList(length, overrideObject) {
  var docs = [];
  for (var i = 0; i < length; i++) {
    var randDate = randomDate(new Date(2010, 1, 1), new Date()).toISOString();
    docs.push(
      createTestDocument({
        name: `Document ${i + 1}`,
        dateCreated: `${randDate}`
      })
    );
  }

  return overrideObject ? Object.assign(docs, overrideObject) : docs;
}

function createMixedDateDocumentListWithNulls(length, overrideObject) {
  var docs = [];
  for (var i = 0; i < length; i++) {
    var randDate =
      i % 3 === 0
        ? null
        : randomDate(new Date(2010, 1, 1), new Date()).toISOString();
    docs.push(
      createTestDocument({
        name: `Document ${i + 1}`,
        dateCreated: `${randDate}`
      })
    );
  }

  return overrideObject ? Object.assign(docs, overrideObject) : docs;
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function generateGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

function cloneWithoutFile(document) {
  var clone = Object.assign({}, document);
  clone.documentFile = null;
  return clone;
}

module.exports = {
  createTestDocument,
  createTestCollectionDocument,
  createTestDocumentList,
  createMixedDateDocumentList,
  createMixedDateDocumentListWithNulls,
  cloneWithoutFile
};
