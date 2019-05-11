import React, { useState } from "react";
import DocumentList from "./DocumentList.js";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import {
  createTestDocument,
  createTestDocumentList
} from "./../../util/dataHelper";
import { action } from "@storybook/addon-actions";
import { object } from "@storybook/addon-knobs";

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

const selectionStateContainer = defaultValue => {
  let [selectedDocument, setSelectedDocument] = useState(defaultValue);

  const onSelected = data => {
    action("selected");
    setSelectedDocument(data);
  };

  return { onSelected, selectedDocument };
};

storiesOf("Document List", module)
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
    () => {
      var container = selectionStateContainer(data.oneLongName[0]);

      return (
        <DocumentList
          onSelected={container.onSelected}
          documents={object("documents", data.oneLongName)}
          selectedDoc={object("selectedDoc", container.selectedDocument)}
        />
      );
    },
    { knobs: { escapeHTML: false } }
  )
  .add(
    "Few Documents, one long attribute name",
    () => {
      var container = selectionStateContainer(data.oneLongAttributeName[0]);

      return (
        <DocumentList
          onSelected={container.onSelected}
          documents={object("documents", data.oneLongAttributeName)}
          selectedDoc={object("selectedDoc", container.selectedDocument)}
          expandedItems={[2]}
        />
      );
    },
    { knobs: { escapeHTML: false } }
  )

  .add(
    "Few Documents",
    () => {
      var container = selectionStateContainer(data.fewDocuments[0]);

      return (
        <DocumentList
          onSelected={container.onSelected}
          documents={object("documents", data.fewDocuments)}
          selectedDoc={object("selectedDoc", container.selectedDocument)}
        />
      );
    },
    { knobs: { escapeHTML: false } }
  )
  .add(
    "Many Documents",
    () => {
      var container = selectionStateContainer(data.manyDocuments[0]);

      return (
        <DocumentList
          onSelected={container.onSelected}
          documents={object("documents", data.manyDocuments)}
          selectedDoc={object("selectedDoc", container.selectedDocument)}
        />
      );
    },
    { knobs: { escapeHTML: false } }
  );
