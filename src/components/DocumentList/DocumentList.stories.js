import React from "react";
import { storiesOf } from "@storybook/react";
import { createStoryDocument } from "./../../util/dataHelper";
import { action } from "@storybook/addon-actions";
import "bootstrap/dist/css/bootstrap.css";
import DocumentList from "./DocumentList.js";
import { withKnobs, object } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";

storiesOf("Document List", module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ header: false }))
  .add(
    "renders multiple",
    () => (
      <DocumentList
        onSelected={action("selected")}
        documents={[
          object(
            "doc 1",
            createStoryDocument({
              Name: "document 1"
            })
          ),
          object(
            "doc 2",
            createStoryDocument({
              Name: "document 2"
            })
          )
        ]}
      />
    ),
    { knobs: { escapeHTML: false } },
    { info: "Document List info" }
  );