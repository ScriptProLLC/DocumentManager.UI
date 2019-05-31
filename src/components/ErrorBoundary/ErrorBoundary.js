import React from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  state = { hasError: false };

  componentDidCatch(error, info) {
    // Consider logging errors to a service. Or use a tool like TrackJS
  }

  render() {
    if (this.state.hasError || this.props.forceError) return this.props.message;
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  // Set to true to force error display. Useful for storybook.
  forceError: PropTypes.bool,
  // Optionally, pass in a custom error message to display
  message: PropTypes.string
};

ErrorBoundary.defaultProps = {
  message: "Sorry, something went wrong. Please try refreshing the page."
};
