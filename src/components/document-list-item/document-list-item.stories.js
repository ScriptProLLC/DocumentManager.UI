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
  );
