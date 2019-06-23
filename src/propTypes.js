import { string, shape, object } from "prop-types";

export const documentPropType = shape({
  id: string.isRequired,
  documentCollectionId: string.isRequired,
  name: string.isRequired,
  documentFile: string.isRequired,
  dateCreated: string.isRequired,
  attributes: object.isRequired
});
