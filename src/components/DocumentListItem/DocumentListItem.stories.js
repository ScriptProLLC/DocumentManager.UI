import React from "react";
import { storiesOf } from "@storybook/react";
import { createTestDocument } from "../../util/dataHelper";
import { action } from "@storybook/addon-actions";
import "bootstrap/dist/css/bootstrap.css";
import DocumentListItem from "./DocumentListItem.js";
import { withKnobs, object } from "@storybook/addon-knobs";

storiesOf("Document List Item", module)
  .addDecorator(withKnobs)
  .add("Collapsed", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object("document", createTestDocument())}
    />
  ))
  .add("Expanded", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      expanded={true}
      document={object("document", createTestDocument())}
    />
  ))
  .add("Unicode In Name", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object(
        "document",
        createTestDocument({ Name: "Document Name \u0913" })
      )}
    />
  ))
  .add("Empty Name", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object("document", createTestDocument({ Name: "" }))}
    />
  ))
  .add("Null Name", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object("document", createTestDocument({ Name: null }))}
    />
  ))
  .add("Long Document Name", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      document={object(
        "document",
        createTestDocument({
          Name:
            "ThisDocumentHasAReallyLongAttributeForTestingBecausePeopleWillNaturallyCreateStringsThatAreRidiculouslyTooLongSoItMakesSenseToTestAllCasesForSure"
        })
      )}
    />
  ))
  .add("No Attributes", () => (
    <DocumentListItem
      reportToggle={action("toggle")}
      expanded={true}
      document={object("document", createTestDocument({ Attributes: null }))}
    />
  ))
  .add(
    "Various Attribute Strings",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        expanded={true}
        document={object(
          "document",
          createTestDocument({
            Attributes: {
              "Name with Spaces": "Attribute with Spaces",
              "Name with Apostraphe '": "Attribute's value",
              "This Document Has A Really Long Name For Testing":
                "ThisDocumentHasAReallyLongAttributeForTestingBecausePeopleWillNaturallyCreateStringsThatAreRidiculouslyTooLongSoItMakesSenseToTestAllCasesForSure"
            }
          })
        )}
      />
    ),
    { knobs: { escapeHTML: false } }
  );
