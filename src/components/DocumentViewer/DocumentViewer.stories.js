import React from "react";
import { storiesOf } from "@storybook/react";
import DocumentViewer from "./DocumentViewer";
import { createTestDocument } from "../../util/dataHelper";
import { withKnobs, object } from "@storybook/addon-knobs";

const data = {
  generic: createTestDocument({ name: "DocumentViewer Document" }),
  removeThis: createTestDocument({
    name: "DocumentViewer Document to be removed"
  }),
  noFile: createTestDocument({
    name: "DocumentViewer Document, document but no file",
    documentFile: null
  })
};

storiesOf("DocumentViewer", module).add("DocumentViewer", () => (
  <DocumentViewer document={data.generic} />
));

storiesOf("DocumentViewer", module).add("DocumentViewer, no documents", () => (
  <DocumentViewer document={null} />
));

storiesOf("DocumentViewer", module).add(
  "DocumentViewer, document but no document file",
  () => <DocumentViewer document={data.noFile} />
);

storiesOf("DocumentViewer", module)
  .addDecorator(withKnobs)
  .add("DocumentViewer, document to be removed", () => (
    <DocumentViewer document={object("document", data.removeThis)} />
  ));
