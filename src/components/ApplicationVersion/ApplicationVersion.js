import React from "react";
import "./ApplicationVersion.scss";

export default function ApplicationVersion() {
  return (
    <div>
      <p>ScriptPro Document Manager</p>
      <p>version {process.env.REACT_APP_VERSION}</p>
    </div>
  );
}
