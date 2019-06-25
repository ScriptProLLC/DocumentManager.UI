import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalDialog.scss";

export default function ModalDialog({
  header,
  iconStyle,
  cancelPrompt,
  confirmPrompt,
  reportResult,
  toggle,
  showDialog,
  prompt,
  autoFocus
}) {
  // Confirm
  function confirmClick() {
    reportResult(confirmPrompt);
  }

  // Cancel
  function cancelClick() {
    reportResult(cancelPrompt);
  }

  // Toggle
  function onToggle() {
    if (toggle) {
      toggle();
    } else {
      reportResult(cancelPrompt);
    }
  }

  // Determine Icon Classes
  function iconClass() {
    switch (iconStyle) {
      case "Info":
        return "fa fa-lg fa-info-circle text-secondary";
      case "Warning":
        return "fa fa-lg fa-exclamation-triangle text-warning";
      case "Error":
        return "fa fa-lg fa-times text-danger";
      default:
        return;
    }
  }

  return (
    <Modal
      autoFocus={false}
      isOpen={showDialog}
      toggle={onToggle}
      aria-label="Modal"
      backdrop="static"
    >
      <ModalHeader toggle={onToggle} aria-label="Modal header">
        <i className={iconClass() + " mr-3"} aria-label="Modal icon" />
        <strong className="modal-header-text" aria-label="Modal header text">
          {header}
        </strong>
      </ModalHeader>
      <ModalBody>
        {/* Why not target the p text in tests instead of using aria-label? */}
        <p aria-label="Modal prompt">{prompt}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          autoFocus={autoFocus === confirmPrompt}
          color="secondary"
          onClick={confirmClick}
        >
          {confirmPrompt}
        </Button>
        <Button
          autoFocus={autoFocus === cancelPrompt}
          color="grey"
          onClick={cancelClick}
          // The cancelPrompt is the label.
        >
          {cancelPrompt}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// Define PropTypes For Modal Dialog
ModalDialog.propTypes = {
  header: PropTypes.string,
  prompt: PropTypes.string,
  confirmPrompt: PropTypes.string,
  cancelPrompt: PropTypes.string,
  iconStyle: PropTypes.string,
  reportResult: PropTypes.func,
  toggle: PropTypes.func,
  showDialog: PropTypes.bool,
  autoFocus: PropTypes.string
};

// Default Props
ModalDialog.defaultProps = {
  header: "Alert",
  iconStyle: "Warning",
  cancelPrompt: "Cancel",
  confirmPrompt: "Confirm",
  reportResult: null
};
