import React from "react";
import DocumentEditPanel from "./DocumentEditPanel";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { createTestDocument } from "./../../../util/dataHelper";
import { action } from "@storybook/addon-actions";
import { object } from "@storybook/addon-knobs";

const data = {
  basic: createTestDocument(),
  noName: createTestDocument({ name: null })
};

storiesOf("Document Edit", module)
  .addDecorator(
    host({
      title: "DocumentEdit Component",
      align: "center top",
      height: 58,
      width: 900,
      border: true
    })
  )
  .add("Basic", () => (
    <DocumentEditPanel
      document={object("document", data.basic)}
      setInEditMode={action("set edit mode")}
      dispatchDocumentAction={action("dispatch")}
    />
  ))
  .add("No document name", () => (
    <DocumentEditPanel
      document={object("document", data.noName)}
      setInEditMode={action("set edit mode")}
      dispatchDocumentAction={action("dispatch")}
    />
  ));
