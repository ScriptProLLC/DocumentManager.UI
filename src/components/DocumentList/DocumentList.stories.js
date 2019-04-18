import React from "react";
import DocumentList from "./DocumentList.js";
import "bootstrap/dist/css/bootstrap.css";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import {
  createTestDocument,
  createTestDocumentList
} from "./../../util/dataHelper";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

const data = {
  fewDocuments: createTestDocumentList(3),
  manyDocuments: createTestDocumentList(30),
  oneLongName: [
    createTestDocument({ name: "DocumentList document 1" }),
    createTestDocument({
      name:
        "ThisDocumentHasAReallyLongAttributeForTestingBecausePeopleWillNaturallyCreateStringsThatAreRidiculouslyTooLongSoItMakesSenseToTestAllCasesForSure"
    })
  ],
  oneLongAttributeName: [
    createTestDocument({ name: "DocumentList document 1" }),
    createTestDocument({
      name: "DocumentList document 2",
      attributes: {
        "This Document Has A Really Long Name For Testing":
          "ThisDocumentHasAReallyLongAttributeForTestingBecausePeopleWillNaturallyCreateStringsThatAreRidiculouslyTooLongSoItMakesSenseToTestAllCasesForSure"
      }
    })
  ]
};

storiesOf("Document List", module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: "DocumentList Component",
      align: "center top",
      height: 500,
      width: 400,
      border: true
    })
  )
  .add(
    "No Documents",
    () => <DocumentList onSelected={action("selected")} documents={[]} />,
    { knobs: { escapeHTML: false } }
  )
  .add(
    "Few Documents, one long name",
    () => (
      <DocumentList
        onSelected={action("selected")}
        documents={object("documents", data.oneLongName)}
      />
    ),
    { knobs: { escapeHTML: false } }
  )
  .add(
    "Few Documents, one long attribute name",
    () => (
      <DocumentList
        onSelected={action("selected")}
        documents={object("documents", data.oneLongAttributeName)}
      />
    ),
    { knobs: { escapeHTML: false } }
  )

  .add(
    "Few Documents",
    () => (
      <DocumentList
        onSelected={action("selected")}
        documents={object("documents", data.fewDocuments)}
      />
    ),
    { knobs: { escapeHTML: false } }
  )
  .add(
    "Many Documents",
    () => (
      <DocumentList
        onSelected={action("selected")}
        documents={object("documents", data.manyDocuments)}
      />
    ),
    { knobs: { escapeHTML: false } }
  );
