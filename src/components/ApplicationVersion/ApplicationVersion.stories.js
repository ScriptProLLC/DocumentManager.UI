import React from "react";
import ApplicationVersion from "./ApplicationVersion";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

storiesOf("Application Version", module)
  .addDecorator(
    host({
      title: "Application Version Component",
      align: "center top",
      height: 100,
      width: 400,
      border: true
    })
  )
  .add("Basic", () => <ApplicationVersion />);
