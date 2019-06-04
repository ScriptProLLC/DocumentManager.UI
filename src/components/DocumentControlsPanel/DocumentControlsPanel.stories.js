import React, { useState } from "react";
import DocumentControlsPanel from "./DocumentControlsPanel";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { createTestDocument } from "./../../util/dataHelper";
import { action } from "@storybook/addon-actions";
import { object } from "@storybook/addon-knobs";

const data = {
  basic: createTestDocument()
};

const actionsContainer = defaultValue => {
  let [document, setDocument] = useState(defaultValue);

  const onEdit = data => {
    action("dispatch edit");
    setDocument(data.document);
  };

  return { onEdit, document };
};

storiesOf("Document Controls Panel", module)
  .addDecorator(
    host({
      title: "Document Controls Panel Component",
      align: "center top",
      height: 58,
      width: 900,
      border: true
    })
  )
  .add("Basic", () => {
    var container = actionsContainer(data.basic);

    return (
      <DocumentControlsPanel
        document={object("document", container.document)}
        dispatchDocumentAction={container.onEdit}
      />
    );
  });
