import React from "react";

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
        document={object("document", {
          Name: "Document Name",
          DateCreated: "01/01/1970 09:22 AM",
          Attributes: {
            pages: "3",
            fileSize: "543K"
          }
        })}
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
        document={object("document", {
          Name: "Document Name",
          DateCreated: "01/01/1970 09:22 AM",
          Attributes: {
            pages: "3",
            fileSize: "543K"
          }
        })}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "unicode in name",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        document={object("document", {
          Name: "Document Name \u0913",
          DateCreated: "01/01/1970 09:22 AM",
          Attributes: {
            pages: "3",
            fileSize: "543K"
          }
        })}
      />
    ),
    { info: "Document List Item info" }
  )
  .add(
    "empty name",
    () => (
      <DocumentListItem
        reportToggle={action("toggle")}
        document={object("document", {
          Name: "",
          DateCreated: "01/01/1970 09:22 AM",
          Attributes: {
            pages: "3",
            fileSize: "543K"
          }
        })}
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
        document={object("document", {
          Name: "Document Name",
          DateCreated: "01/01/1970 09:22 AM",
          Attributes: {}
        })}
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
        document={object("document", {
          Name: "Document Name",
          DateCreated: "01/01/1970 09:22 AM",
          Attributes: {
            withSpaces: "Attribute with Spaces",
            withApostraphe: "Attribute's value",
            withNoSpaces: "ThisDocumentHasAReallyLongAtrtibuteForTesting"
          }
        })}
      />
    ),
    { knobs: { escapeHTML: false } },
    { info: "Document List Item info" }
  );
