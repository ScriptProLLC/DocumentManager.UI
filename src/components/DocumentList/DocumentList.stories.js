import React from "react";

import { storiesOf, addParameters } from "@storybook/react";
import { createStoryDocument } from "./../../util/dataHelper";
import { action } from "@storybook/addon-actions";

//import { Button, Welcome } from "@storybook/react/demo";
import "bootstrap/dist/css/bootstrap.css";
import DocumentList from "./DocumentList.js";

import { withKnobs, object, array } from "@storybook/addon-knobs";

import { withInfo } from "@storybook/addon-info";

const newViewports = {
  device1: {
    name: "Device 1",
    styles: {
      width: "600px",
      height: "963px"
    }
  },
  device2: {
    name: "Device 2",
    styles: {
      width: "533px",
      height: "801px"
    }
  }
};

addParameters({
  viewport: { viewports: newViewports, defaultViewport: "device1" }
});

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
