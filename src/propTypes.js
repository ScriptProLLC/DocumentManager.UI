import { string, shape, object } from "prop-types";

export const documentPropType = shape({
  id: string,
  documentCollectionId: string,
  name: string,
  documentFile: string,
  dateCreated: string,
  attributes: object
});
