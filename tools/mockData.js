const documents = [
  {
    Id: "5b41a43f-d819-4c6f-b1bd-97327719113d",
    DocumentCollectionId: "030b9d08-e102-460c-882a-6b0d562aad29",
    Name: "document 1",
    DocumentFile: "Base64StringHere1",
    DateCreated: "02/25/2018"
  },
  {
    Id: "5b41a43f-d819-4c6f-b1bd-97327719113d",
    DocumentCollectionId: "030b9d08-e102-460c-882a-6b0d562aad29",
    Name: "document 2",
    DocumentFile: "Base64StringHere2",
    DateCreated: "05/21/2018"
  },
  {
    Id: "5b41a43f-d819-4c6f-b1bd-97327719113d",
    DocumentCollectionId: "2e1b0759-3dab-415d-a739-16b63b32f79a",
    Name: "document 3",
    DocumentFile: "Base64StringHere3",
    DateCreated: "07/14/2018"
  },
  {
    Id: "5b41a43f-d819-4c6f-b1bd-97327719113d",
    DocumentCollectionId: "a8ac41fb-c75b-4653-bd30-a61b88ab3b3e",
    Name: "document 4",
    DocumentFile: "Base64StringHere4",
    DateCreated: "08/23/2018"
  },
  {
    Id: "5b41a43f-d819-4c6f-b1bd-97327719113d",
    DocumentCollectionId: "ba75ba0e-98ae-4de1-a2ce-c4bd5890e195",
    Name: "document 5",
    DocumentFile: "Base64StringHere5",
    DateCreated: "12/06/2018"
  },
  {
    Id: "5b41a43f-d819-4c6f-b1bd-97327719113d",
    DocumentCollectionId: "819984a5-3ab7-4cf7-bb90-136c1cb71706",
    Name: "document 6",
    DocumentFile: "Base64StringHere6",
    DateCreated: "01/03/2019"
  }
];

const documentCollections = [
  { Id: "030b9d08-e102-460c-882a-6b0d562aad29" },
  { Id: "2e1b0759-3dab-415d-a739-16b63b32f79a" },
  { Id: "a8ac41fb-c75b-4653-bd30-a61b88ab3b3e" },
  { Id: "ba75ba0e-98ae-4de1-a2ce-c4bd5890e195" },
  { Id: "819984a5-3ab7-4cf7-bb90-136c1cb71706" }
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  documents,
  documentCollections
};
