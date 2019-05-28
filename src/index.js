import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import DocumentManager from "./components/DocumentManager/DocumentManager";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "font-awesome/css/font-awesome.min.css";
import "./bootstrap-theme.scss";
import "./index.scss";

ReactDOM.render(
  <ErrorBoundary>
    <DocumentManager
      collectionId={getCollectionFromUrl(document.location.href)}
    />
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function getCollectionFromUrl(url) {
  return url.includes("?collection=") ? url.split("=")[1] : null;
}
