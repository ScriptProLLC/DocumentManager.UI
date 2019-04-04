import React from "react";

import { storiesOf } from "@storybook/react";

//import { Button, Welcome } from "@storybook/react/demo";
import "bootstrap/dist/css/bootstrap.css";
import DocumentListItem from "./document-list-item.js";

import { withKnobs, object } from "@storybook/addon-knobs";

import { withInfo } from "@storybook/addon-info";

storiesOf("DocumentListItem component", module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ header: false }))
  .add(
    "component",
    () => (
      <DocumentListItem
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
    { info: "DocumentListItem info" }
  );
