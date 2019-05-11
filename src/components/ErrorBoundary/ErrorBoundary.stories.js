import React from "react";
import { storiesOf } from "@storybook/react";
import ErrorBoundary from "./ErrorBoundary";

storiesOf("ErrorBoundary", module).add("default", () => (
  <ErrorBoundary forceError>
    <p>Child content</p>
  </ErrorBoundary>
));
