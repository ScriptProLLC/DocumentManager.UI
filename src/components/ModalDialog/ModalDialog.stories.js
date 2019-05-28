import React from "react";
import { storiesOf } from "@storybook/react";
import { object, text, boolean } from "@storybook/addon-knobs";
import ModalDialog from "./ModalDialog";
import { action } from "@storybook/addon-actions";

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
  ));
