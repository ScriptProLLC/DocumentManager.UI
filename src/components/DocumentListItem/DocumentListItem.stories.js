import React from "react";
import DocumentListItem from "./DocumentListItem.js";
import "bootstrap/dist/css/bootstrap.css";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";
import { createTestDocument } from "../../util/dataHelper";

const data = {
  generic: createTestDocument(),
  unicodeInName: createTestDocument({ name: "Document Name \u0913" }),
  emptyName: createTestDocument({ name: "" }),
  nullName: createTestDocument({ name: null }),
  longName: createTestDocument({
    name:
      "ThisDocumentHasAReallyLongAttributeForTestingBecausePeopleWillNaturallyCreateStringsThatAreRidiculouslyTooLongSoItMakesSenseToTestAllCasesForSure"
  }),
  variousAttributes: createTestDocument({
    attributes: {
      "Name with Spaces": "Attribute with Spaces",
      "Name with Apostraphe '": "Attribute's value",
      "This Document Has A Really Long Name For Testing":
        "ThisDocumentHasAReallyLongAttributeForTestingBecausePeopleWillNaturallyCreateStringsThatAreRidiculouslyTooLongSoItMakesSenseToTestAllCasesForSure"
    }
  }),
  noAttributes: createTestDocument({
    attributes: null
  })
};

storiesOf("Document List Item", module)
  .addDecorator(withKnobs)
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
