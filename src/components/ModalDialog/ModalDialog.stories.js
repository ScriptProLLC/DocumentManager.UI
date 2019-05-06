import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";
import ModalDialog from "./ModalDialog";

function reportResult(result) {
  console.log(result);
}

// just a no-op for the toggle action as it has no real meaning here
function toggle() {}

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
