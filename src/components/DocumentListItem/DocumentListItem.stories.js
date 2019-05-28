import React from "react";
import DocumentListItem from "./DocumentListItem.js";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { action } from "@storybook/addon-actions";
import { object } from "@storybook/addon-knobs";
import { createTestCollectionDocument } from "../../util/dataHelper";

const data = {
  generic: createTestCollectionDocument(),
  unicodeInName: createTestCollectionDocument({ name: "Document Name \u0913" }),
  emptyName: createTestCollectionDocument({ name: "" }),
  nullName: createTestCollectionDocument({ name: null }),
  longName: createTestCollectionDocument({
    name:
      "ThisDocumentHasAReallyLongAttributeForTestingBecausePeopleWillNaturallyCreateStringsThatAreRidiculouslyTooLongSoItMakesSenseToTestAllCasesForSure"
  }),
  variousAttributes: createTestCollectionDocument({
    attributes: {
      "Name with Spaces": "Attribute with Spaces",
      "Name with Apostraphe '": "Attribute's value",
      "This Document Has A Really Long Name For Testing":
        "ThisDocumentHasAReallyLongAttributeForTestingBecausePeopleWillNaturallyCreateStringsThatAreRidiculouslyTooLongSoItMakesSenseToTestAllCasesForSure"
    }
  }),
  noAttributes: createTestCollectionDocument({
    attributes: null
  })
};

storiesOf("Document List Item", module)
  .addDecorator(
    host({
      title: "DocumentListItem Component",
      align: "center top",
      height: 800,
      width: 400,
      border: true
    })
  )
  .add("Collapsed", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object("document", data.generic)}
    />
  ))
  .add("Expanded", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      expanded={true}
      document={object("document", data.generic)}
    />
  ))
  .add("Unicode In Name", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object("document", data.unicodeInName)}
    />
  ))
  .add("Empty Name", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object("document", data.emptyName)}
    />
  ))
  .add("Null Name", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object("document", data.nullName)}
    />
  ))
  .add("Long Document Name", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object("document", data.longName)}
    />
  ))
  .add("No Attributes", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      expanded={true}
      document={object("document", data.noAttributes)}
    />
  ))
  .add(
    "Various Attribute Strings",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        expanded={true}
        document={object("document", data.variousAttributes)}
      />
    ),
    { knobs: { escapeHTML: false } }
  );
