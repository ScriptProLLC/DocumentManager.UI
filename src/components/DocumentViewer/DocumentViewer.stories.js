import React from "react";
import { storiesOf } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.css";
import DocumentViewer from "./DocumentViewer.js";
import { object } from "@storybook/addon-knobs";
import { createTestDocument } from "../../util/dataHelper";

const data = {
  generic: createTestDocument()
};

storiesOf("Document Viewer", module).add("Document Viewer", () => (
  <DocumentViewer document={object("document", data.generic)} />
));
