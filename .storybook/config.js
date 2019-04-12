import { configure } from "@storybook/react";
import "@storybook/addon-console";
import { themes } from "@storybook/theming";
import { addParameters } from "@storybook/react";

const req = require.context("../src/components", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const newViewports = {
  device1: {
    name: "Device 1",
    styles: {
      width: "600px",
      height: "963px"
    }
  },
  device2: {
    name: "Device 2",
    styles: {
      width: "533px",
      height: "801px"
    }
  }
};

addParameters({
  viewport: { viewports: newViewports, defaultViewport: "device1" }
});

addParameters({
  options: {
    theme: themes.dark
  }
});

configure(loadStories, module);
