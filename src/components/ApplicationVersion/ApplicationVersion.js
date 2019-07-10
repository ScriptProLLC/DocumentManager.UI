import React from "react";
import "./ApplicationVersion.scss";

export default function ApplicationVersion() {
  return (
    <footer className="app-version-container">
      <p aria-label="Application version number">
        Version - {process.env.REACT_APP_VERSION}
      </p>
    </footer>
  );
}
