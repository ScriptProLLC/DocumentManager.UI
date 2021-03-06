import axios from "axios";
import { ApiError } from "./ApiError";
import ApiErrorTypes from "./ApiErrorTypes";

export async function getCollectionDocuments(collectionId) {
  var path = `/collections/${collectionId}/documents`;

  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data)
    .catch(error => {
      throw new ApiError(ApiErrorTypes.Get_Collection_Documents, error, true);
    });
}

export async function getDocument(documentId) {
  var path = `/documents/${documentId}`;

  return await axios
    .get(process.env.REACT_APP_API_URL + path)
    .then(res => res.data)
    .catch(error => {
      throw new ApiError(ApiErrorTypes.Get_Document, error);
    });
}

export async function deleteDocument(documentId) {
  var path = `/documents/${documentId}`;

  return await axios
    .delete(process.env.REACT_APP_API_URL + path)
    .then(res => res.data)
    .catch(error => {
      throw new ApiError(ApiErrorTypes.Delete_Document, error);
    });
}

export async function patchDocument(document) {
  var path = `/documents/${document.id}`;
  var patchBody = JSON.stringify([
    { op: "replace", path: "/Name", value: document.name }
  ]);

  return await axios
    .patch(process.env.REACT_APP_API_URL + path, patchBody, {
      headers: { "Content-Type": "application/json-patch+json" }
    })
    .then(res => res.data)
    .catch(error => {
      throw new ApiError(ApiErrorTypes.Save_Document, error);
    });
}

export async function postDocument(document) {
  var path = "/documents";

  return await axios
    .post(process.env.REACT_APP_API_URL + path, document)
    .then(res => res.data)
    .catch(error => {
      throw new ApiError(ApiErrorTypes.Save_Document, error);
    });
}

export async function postCollection(collectionId) {
  var path = "/collections";

  return await axios
    .post(process.env.REACT_APP_API_URL + path, { id: collectionId })
    .then(res => res.data)
    .catch(error => {
      throw new ApiError(ApiErrorTypes.Create_Collection, error);
    });
}
