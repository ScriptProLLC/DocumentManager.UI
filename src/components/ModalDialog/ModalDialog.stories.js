import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";
import ModalDialog from "./ModalDialog";

function reportResult(result) {
  console.log(result);
}

function toggle() {
  console.log("(x) button was clicked");
}

storiesOf("ModalDialog", module)
  .addDecorator(withKnobs)
  .add("All params set", () => (
    <ModalDialog
      showDialog={object("showDialog", true)}
      toggle={toggle}
      iconStyle={object("iconStyle", "Warning")}
      cancelPrompt={object("cancelPrompt", "No")}
      reportResult={reportResult}
      confirmPrompt={object("confirmPrompt", "Yes")}
      header={object("header", "Alert")}
      prompt={object("prompt", "Are you sure you want to do this?")}
    />
  ))
  .add("Use all available defaults", () => (
    <ModalDialog
      showDialog={object("showDialog", true)}
      reportResult={reportResult}
      prompt={object("prompt", "Are you sure you want to do this?")}
    />
  ));
