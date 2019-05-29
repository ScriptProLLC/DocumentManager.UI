import React from "react";
import IconButton from "./IconButton";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { object } from "@storybook/addon-knobs";

let buttonClick = () => {
  console.log("Button Clicked");
};

storiesOf("Icon Button", module)
  .addDecorator(
    host({
      title: "Custom Buttons",
      align: "center top",
      height: 50,
      width: 400,
      border: true
    })
  )
  .add("IconButton Basic", () => (
    <IconButton
      onClick={buttonClick}
      icon={object("icon", "fa fa-trash-o")}
      color={object("color", "red")}
    />
  ));
