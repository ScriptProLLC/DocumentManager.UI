import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { themes } from "@storybook/theming";
import { addParameters } from "@storybook/react";
import "@storybook/addon-console";
import "font-awesome/css/font-awesome.min.css";
import "../src/index.scss";
import "../src/bootstrap-theme.scss";
import "./storybook.scss";

const req = require.context("../src/components", true, /\.stories\.js$/);

addDecorator(withKnobs);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const newViewports = {
  device1: {
    name: "1920x1080",
    styles: {
      width: "1920px",
      height: "1080px"
    }
  },
  device2: {
    name: "1440x900",
    styles: {
      width: "1440px",
      height: "900px"
    }
  },
  device3: {
    name: "1366x768",
    styles: {
      width: "1366px",
      height: "768px"
    }
  },
  device4: {
    name: "1280x1024",
    styles: {
      width: "1280px",
      height: "1024px"
    }
  },
  device5: {
    name: "1024x768",
    styles: {
      width: "1024px",
      height: "768px"
    }
  }
};

addParameters({
  viewport: { viewports: newViewports, defaultViewport: "device2" }
});

addParameters({
  options: {
    theme: themes.dark
  }
});

configure(loadStories, module);
