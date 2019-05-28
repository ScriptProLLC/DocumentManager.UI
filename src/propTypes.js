import { string, shape } from "prop-types";

export const documentPropType = shape({
  id: string,
  documentCollectionId: string,
  name: string,
  documentFile: string,
  dateCreated: string,
  attributes: shape({
    Pages: string,
    "File Size": string
  })
});
