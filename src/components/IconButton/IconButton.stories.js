import React from "react";
import IconButton from "./IconButton";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { text } from "@storybook/addon-knobs";

let buttonClick = () => {
  console.log("Button Clicked");
};

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
      onClick={buttonClick}
      icon={text("icon", "home")}
      color={text("color", "primary")}
      size={text("size", "3x")}
    />
  ));
