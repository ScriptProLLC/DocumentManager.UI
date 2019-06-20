import React from "react";
import PropTypes from "prop-types";
import { Modal } from "reactstrap";
import "./SpinnerComponent.scss";

export default function SpinnerComponent(props) {
  return (
    <Modal isOpen={props.open} contentClassName="transparent-bg" centered>
      {/* Using conditional display logic here so that it doesn't render an element if no message exists */}
      {props.message ? (
        <h2 aria-label="Spinner message" className="message">
          {props.message}
        </h2>
      ) : (
        <></>
      )}

      <section className="spinner" aria-label="Spinner icon">
        {/* Create a loop of 12 'dot' divs to create the spinner */}
        {Array.apply(null, { length: 12 }).map((e, i) => (
          <div className="dot" key={i} />
        ))}
      </section>
    </Modal>
  );
}

// Define PropTypes For Spinner Component
SpinnerComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string
};
