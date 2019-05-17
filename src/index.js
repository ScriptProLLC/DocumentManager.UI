import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import DocumentManager from "./components/DocumentManager/DocumentManager";
import "font-awesome/css/font-awesome.min.css";
import "./bootstrap-theme.scss";
import "./index.scss";

if (!containsCollectionParam(document.location.href)) {
  insertParam("collection", "d7a2add9-14bf-480e-9b97-96685a006431");
}

ReactDOM.render(
  <DocumentManager
    collectionId={getCollectionFromUrl(document.location.href)}
  />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function insertParam(key, value) {
  key = encodeURI(key);
  value = encodeURI(value);
  const query = "?" + key + "=" + value;
  if (document.location.href !== document.location.origin + "/" + query) {
    document.location.search = query;
  }
}

function containsCollectionParam(url) {
  return url.includes("?collection=");
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function getCollectionFromUrl(url) {
  return url.split("=")[1];
}
