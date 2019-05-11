import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import ModalDialog from "./ModalDialog";

function reportResult(result) {
  console.log(result);
}

storiesOf("ModalDialog", module)
  .add("All params set", () => (
    <ModalDialog
      showDialog={boolean("showDialog", true)}
      toggle={() => {}}
      iconStyle={text("iconStyle", "warning")}
      cancelPrompt={text("cancelPrompt", "No")}
      reportResult={reportResult}
      confirmPrompt={text("confirmPrompt", "Yes")}
      header={text("header", "Alert")}
      prompt={text("prompt", "Are you sure you want to do this?")}
    />
  ))
  .add("Use all available defaults", () => (
    <ModalDialog
      showDialog={boolean("showDialog", true)}
      reportResult={reportResult}
      prompt={text("prompt", "Are you sure you want to do this?")}
    />
  ));
