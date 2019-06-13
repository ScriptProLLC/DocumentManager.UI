export const ActionTypes = {
  DELETE_ACTIVE_DOCUMENT: {
    name: "DELETE_ACTIVE_DOCUMENT",
    description: "Deletes the currently selected document"
  },
  EDIT_DOCUMENT: {
    name: "EDIT_DOCUMENT",
    description: "Enters app into a state to edit the current document"
  },
  CANCEL_EDIT_DOCUMENT: {
    name: "CANCEL_EDIT_DOCUMENT",
    description: "Returns the app to a read only mode"
  },
  SAVE_DOCUMENT: {
    name: "SAVE_DOCUMENT",
    description: "Saves any changes made in the editing of a document"
  },
  SCAN: {
    name: "SCAN",
    description: "Scans a new document"
  },
  SELECT_DOCUMENT: {
    name: "SELECT_DOCUMENT",
    description: "Sets the selected document to the active document"
  },
  LOAD_COLLECTION: {
    name: "LOAD_COLLECTION",
    description: "Loads the specified collection into the app"
  }
};
