import React from "react";
import { storiesOf } from "@storybook/react";
import { createStoryDocument } from "../../util/dataHelper";
import { action } from "@storybook/addon-actions";
import "bootstrap/dist/css/bootstrap.css";
import DocumentListItem from "./DocumentListItem.js";
import { withKnobs, object } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";

storiesOf("Document List Item", module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ header: false }))
  .add(
    "Collapsed",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        document={object("document", createStoryDocument())}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "Expanded",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        expanded={true}
        document={object("document", createStoryDocument())}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "Unicode In Name",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        document={object(
          "document",
          createStoryDocument({ Name: "Document Name \u0913" })
        )}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "Empty Name",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        document={object("document", createStoryDocument({ Name: "" }))}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "Long Document Name",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        document={object(
          "document",
          createStoryDocument({
            Name:
              "ThisDocumentHasAReallyLongAttributeForTestingBecausePeopleWillNaturallyCreateStringsThatAreRidiculouslyTooLongSoItMakesSenseToTestAllCasesForSure"
          })
        )}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "Various Attribute Strings",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        expanded={true}
        document={object(
          "document",
          createStoryDocument({
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
    { knobs: { escapeHTML: false } },
    { info: "Document List Item info" }
  );