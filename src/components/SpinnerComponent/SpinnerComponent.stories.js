import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import SpinnerComponent from "./SpinnerComponent";

storiesOf("Spinner Component", module)
  .addDecorator(withKnobs)
  .add("Renders empty spinner with no message", () => (
    <SpinnerComponent open={true} />
  ))
  .add("Renders spinner with a custom message", () => (
    <SpinnerComponent message="This is a custom message" open={true} />
  ));
