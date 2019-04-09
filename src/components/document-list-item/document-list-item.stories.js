import React from "react";

import { createStoryDocument } from "./../../util/dataHelper";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

//import { Button, Welcome } from "@storybook/react/demo";
import "bootstrap/dist/css/bootstrap.css";
import DocumentListItem from "./document-list-item.js";

import { withKnobs, object } from "@storybook/addon-knobs";

import { withInfo } from "@storybook/addon-info";

storiesOf("Document List Item", module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ header: false }))
  .add(
    "collapsed",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        document={object("document", createStoryDocument())}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "expanded",
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
    "unicode in name",
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
    "empty name",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        document={object("document", createStoryDocument({ Name: "" }))}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "no attributes",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        expanded={true}
        document={object("document", createStoryDocument({ Attributes: {} }))}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "various attribute strings",
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
              ThisDocumentHasAReallyLongNameForTesting:
                "ThisDocumentHasAReallyLongAtrtibuteForTesting"
            }
          })
        )}
      />
    ),
    { knobs: { escapeHTML: false } },
    { info: "Document List Item info" }
  );
