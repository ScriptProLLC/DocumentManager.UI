import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import DocumentManager from "./components/DocumentManager";
import { getCollectionFromUrl } from "./util/url";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.render(
  <ErrorBoundary>
    <DocumentManager collectionId={getCollectionFromUrl()} />
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
