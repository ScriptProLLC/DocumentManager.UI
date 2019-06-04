import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import SpinnerComponent from "./SpinnerComponent";

storiesOf("Spinner Component", module)
  .addDecorator(withKnobs)
  .add("Renders empty spinner with no message", () => (
    <SpinnerComponent open={boolean("Spinner on", true)} />
  ))
  .add("Renders spinner with a custom message", () => (
    <SpinnerComponent
      message={text("Custom message", "This is a custom message")}
      open={true}
    />
  ))
  .add("Blocks UI while active", () => (
    <div>
      <span>You should not be able to edit when spinner is active </span>
      <br />
      <span>Should be enabled if the spinner is off </span>
      <br />
      <input type="text" />
      <SpinnerComponent open={boolean("Spinner on", true)} />
    </div>
  ));
