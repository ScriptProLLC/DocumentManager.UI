import React from "react";
import IconButton from "./IconButton";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

/* Define Select Options */
const icons = {
  Scan: "upload",
  Save: "save",
  Cancel: "times",
  Edit: "pencil",
  Delete: "trash-o"
};

const colors = {
  Primary: "primary",
  White: "white"
};

const sizes = {
  Default: "1x",
  Large: "lg",
  "2x": "2x",
  "3x": "3x",
  "4x": "4x",
  "5x": "5x"
};

/* Stories */
storiesOf("Icon Button", module)
  .addDecorator(
    host({
      title: "Icon Button",
      align: "center top",
      height: 100,
      width: 400,
      border: true
    })
  )
  .add("Icon Button", () => (
    <IconButton
      onClick={action("Dispatch Action")}
      icon={select("Icon", icons, "save")}
      color={select("Color", colors, "primary")}
      size={select("Size", sizes, "3x")}
    />
  ));
