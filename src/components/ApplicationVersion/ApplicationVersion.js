import React from "react";
import "./ApplicationVersion.scss";

export default function ApplicationVersion() {
  return (
    <div className="app-version-container">
      <p data-testid="application_version">
        Version - {process.env.REACT_APP_VERSION}
      </p>
    </div>
  );
}
