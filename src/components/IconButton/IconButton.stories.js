import React from "react";
import IconButton from "./IconButton";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { object, text } from "@storybook/addon-knobs";
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
      onClick={action("dispatch Basic")}
      icon={text("icon", "home")}
      color={text("color", "primary")}
      size={text("size", "3x")}
    />
  ))
  .add("Scan Button", () => (
    <IconButton
      onClick={action("dispatch Scan")}
      icon={object("icon", "file-image-o")}
      color={object("color", "primary")}
    />
  ));
