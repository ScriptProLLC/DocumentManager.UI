import React from "react";
import IconButton from "./IconButton";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

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
      onClick={action("dispatch basic")}
      icon={text("icon", "home")}
      color={text("color", "primary")}
      size={text("size", "3x")}
    />
  ))
  .add("Scan Button", () => (
    <IconButton
      onClick={action("dispatch Scan")}
      icon={text("icon", "file-image-o")}
      color={text("color", "primary")}
      size={text("size", "3x")}
    />
  ))
  .add("Edit Button", () => (
    <IconButton
      onClick={action("dispatch edit")}
      icon={text("icon", "pencil")}
      color={text("color", "primary")}
      size={text("size", "3x")}
    />
  ))
  .add("Save Button", () => (
    <IconButton
      onClick={action("dispatch save")}
      icon={text("icon", "save")}
      color={text("color", "primary")}
      size={text("size", "3x")}
    />
  ))
  .add("Cancel Button", () => (
    <IconButton
      onClick={action("dispatch cancel")}
      icon={text("icon", "times")}
      color={text("color", "primary")}
      size={text("size", "3x")}
    />
  ));
