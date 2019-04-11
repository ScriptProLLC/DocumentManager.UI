import { configure } from "@storybook/react";
import "@storybook/addon-console";
import { themes } from "@storybook/theming";
import { addParameters } from "@storybook/react";

const req = require.context("../src/components", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    theme: themes.dark
  }
});

configure(loadStories, module);
