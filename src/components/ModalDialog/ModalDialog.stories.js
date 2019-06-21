import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import ModalDialog from "./ModalDialog";

storiesOf("ModalDialog", module)
  .add("All params set", () => (
    <ModalDialog
      showDialog={boolean("showDialog", true)}
      toggle={action("toggle")}
      iconStyle={text("iconStyle", "Warning")}
      cancelPrompt={text("cancelPrompt", "No")}
      reportResult={action("reportResult")}
      confirmPrompt={text("confirmPrompt", "Yes")}
      header={text("header", "Alert")}
      prompt={text("prompt", "Are you sure you want to do this?")}
    />
  ))
  .add("Use all available defaults", () => (
    <ModalDialog
      showDialog={boolean("showDialog", true)}
      reportResult={action("reportResult")}
      prompt={text("prompt", "Are you sure you want to do this?")}
    />
  ))
  .add("Focus on the confirm button", () => (
    <ModalDialog
      autoFocus="Confirm"
      showDialog={boolean("showDialog", true)}
      reportResult={action("reportResult")}
      prompt={text("prompt", "Are you sure you want to do this?")}
    />
  ))
  .add("Focus on the cancel button", () => (
    <ModalDialog
      autoFocus="Cancel"
      showDialog={boolean("showDialog", true)}
      reportResult={action("reportResult")}
      prompt={text("prompt", "Are you sure you want to do this?")}
    />
  ))
  .add("Single button", () => (
    <ModalDialog
      showDialog={boolean("showDialog", true)}
      cancelPrompt={null}
      reportResult={action("reportResult")}
      prompt={text("prompt", "Are you sure you want to do this?")}
    />
  ));
