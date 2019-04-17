import React from "react";
import DocumentList from "./DocumentList.js";

import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

import { createTestDocument } from "./../../util/dataHelper";

import "bootstrap/dist/css/bootstrap.css";

storiesOf("Document List", module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: "DocumentList Component",
      align: "center top",
      height: 800,
      width: 400,
      border: true
    })
  )
  .add(
    "No Documents",
    () => <DocumentList onSelected={action("selected")} documents={[]} />,
    { knobs: { escapeHTML: false } }
  )
  .add(
    "Few Documents",
    () => (
      <DocumentList
        onSelected={action("selected")}
        documents={[
          object(
            "doc 1",
            createTestDocument({
              Name: "Document 1"
            })
          ),
          object(
            "doc 2",
            createTestDocument({
              Name: "Document 2"
            })
          )
        ]}
      />
    ),
    { knobs: { escapeHTML: false } }
  )
  .add(
    "Many Documents",
    () => (
      <DocumentList
        onSelected={action("selected")}
        documents={[
          object(
            "doc 1",
            createTestDocument({
              Name: "Document 1"
            })
          ),
          object(
            "doc 2",
            createTestDocument({
              Name: "Document 2"
            })
          ),
          object(
            "doc 3",
            createTestDocument({
              Name: "Document 3"
            })
          ),
          object(
            "doc 4",
            createTestDocument({
              Name: "Document 4"
            })
          ),
          object(
            "doc 5",
            createTestDocument({
              Name: "Document 5"
            })
          ),
          object(
            "doc 6",
            createTestDocument({
              Name: "Document 6"
            })
          ),
          object(
            "doc 7",
            createTestDocument({
              Name: "Document 7"
            })
          )
        ]}
      />
    ),
    { knobs: { escapeHTML: false } }
  );
