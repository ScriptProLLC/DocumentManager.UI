import React from "react";
import DocumentActionsPanel from "./DocumentActionsPanel";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { createTestDocument } from "./../../../util/dataHelper";
import { action } from "@storybook/addon-actions";

const data = {
  basic: createTestDocument(),
  noName: createTestDocument({ name: null })
};

storiesOf("Document Actions Panel", module)
  .addDecorator(
    host({
      title: "DocumentActions Component",
      align: "center top",
      height: 58,
      width: 900,
      border: true
    })
  )
  .add("Basic", () => (
    <DocumentActionsPanel
      document={data.basic}
      dispatchDocumentAction={action("dispatch")}
    />
  ))
  .add("Document with no name", () => (
    <DocumentActionsPanel
      document={data.noName}
      dispatchDocumentAction={action("dispatch")}
    />
  ));
