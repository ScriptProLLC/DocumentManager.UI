import React from "react";
import DocumentActions from "./DocumentActions";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { createTestDocument } from "./../../util/dataHelper";
import { action } from "@storybook/addon-actions";

const data = {
  basic: createTestDocument(),
  noName: createTestDocument({ name: null })
};

storiesOf("Document Actions", module)
  .addDecorator(
    host({
      title: "DocumentActions Component",
      align: "center top",
      height: 50,
      width: 400,
      border: true
    })
  )
  .add("Basic", () => (
    <DocumentActions
      document={data.basic}
      dispatchDocumentAction={action("dispatch")}
    />
  ))
  .add("Document with no name", () => (
    <DocumentActions
      document={data.noName}
      dispatchDocumentAction={action("dispatch")}
    />
  ));
