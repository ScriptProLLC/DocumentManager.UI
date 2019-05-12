import { string, shape } from "prop-types";

export const documentType = shape({
  id: string,
  documentCollectionId: string,
  name: string,
  documentFile: string,
  dateCreated: string,
  attributes: shape({
    // TODO: Convert to camelCase when retrieved if the source API cannot be changed. Ideally, update source API to accept a header that requests camelCased JSON for this.
    Pages: string,
    "File Size": string
  })
});
