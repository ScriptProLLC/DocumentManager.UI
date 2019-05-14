import React from "react";
import DocumentActions from "./DocumentActions";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { createTestDocument } from "./../../util/dataHelper";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

const data = {
  basic: createTestDocument()
};

storiesOf("Document Actions", module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: "DocumentActions Component",
      align: "center top",
      height: 50,
      width: 400,
      border: true
    })
  )
  .add("Basic", () => <DocumentActions document={data.basic} />)
  .add("No document", () => <DocumentActions document={null} />);
