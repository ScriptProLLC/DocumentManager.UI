import React from "react";
import DocumentManager from "./DocumentManager.js";
import "bootstrap/dist/css/bootstrap.css";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

const data = {};

storiesOf("Document Manager", module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: "DocumentManager Component",
      align: "center top",
      height: 800,
      width: 1200,
      border: true
    })
  )
  .add("Basic", () => <DocumentManager />);
