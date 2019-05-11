import React from "react";
import { storiesOf } from "@storybook/react";
import Icon from "./Icon";

storiesOf("Icons", module)
  .add("Info", () => <Icon type="info" />)
  .add("Warning", () => <Icon type="warning" />)
  .add("Error", () => <Icon type="error" />)
  .add("Caret Down", () => <Icon type="caret-down" />)
  .add("Caret Right", () => <Icon type="caret-right" />)
  .add("File", () => <Icon type="file" />)
  .add("File-o", () => <Icon type="file-o" />);
