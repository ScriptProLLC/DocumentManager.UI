import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import { withInfo } from "@storybook/addon-info";

const stories = storiesOf("Storybook Knobs", module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

stories.addDecorator(
  withInfo({
    header: false // Global configuration for the info addon across all components
  })
);

// Knobs for React props
stories.add(
  "with a button",
  () => (
    <button disabled={boolean("Disabled", false)}>
      {text("Label", "Hello Storybook")}
    </button>
  ),
  { info: "button info" }
);

// Knobs as dynamic variables.
stories.add(
  "as dynamic variables",
  () => {
    const name = text("Name", "Arunoda Susiripala");
    const age = number("Age", 89);

    const content = `I am ${name} and I'm ${age} years old.`;
    return <div>{content}</div>;
  },
  { info: "this is a dynamic variable" }
);
