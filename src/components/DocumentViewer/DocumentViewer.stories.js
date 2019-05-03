import React from "react";
import { storiesOf } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.css";
import DocumentViewer from "./DocumentViewer";
import { createTestDocument } from "../../util/dataHelper";

const data = {
  generic: createTestDocument({ name: "DocumentViewer Document" })
};

storiesOf("DocumentViewer", module).add("DocumentViewer", () => (
  <DocumentViewer document={data.generic} />
));
