import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalDialog.scss";

function ModalDialog(props) {
  let header = props.header || "Alert";
  let iconStyle = props.iconStyle || "Warning";
  let cancelPrompt = props.cancelPrompt || "Cancel";
  let confirmPrompt = props.confirmPrompt || "Confirm";

  // Confirm
  function confirmClick() {
    if (props.reportResult) {
      props.reportResult(confirmPrompt);
    }
  }

  // Cancel
  function cancelClick() {
    if (props.reportResult) {
      props.reportResult(cancelPrompt);
    }
  }

  // Toggle
  const toggle = () => {
    if (props.toggle) {
      props.toggle();
    } else {
      props.reportResult(cancelPrompt);
    }
  };

  // Determine Icon Classes
  const iconClass = style => {
    switch (style) {
      case "Info":
        return "fa fa-lg fa-info-circle text-secondary";
      case "Warning":
        return "fa fa-lg fa-exclamation-triangle text-warning";
      case "Error":
        return "fa fa-lg fa-times text-danger";
      default:
        return;
    }
  };

  return (
    <Modal isOpen={props.showDialog} toggle={toggle} data-testid="modal">
      <ModalHeader toggle={toggle} data-testid="modal-header">
        <i
          className={iconClass(iconStyle) + " mr-3"}
          data-testid="modal-icon"
        />
        <strong className="modal-header-text">{header}</strong>
      </ModalHeader>
      <ModalBody>
        <p data-testid="modal-prompt">{props.prompt}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={confirmClick}
          data-testid="modal-confirm-prompt"
        >
          {confirmPrompt}
        </Button>
        <Button
          color="grey"
          onClick={cancelClick}
          data-testid="modal-cancel-prompt"
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
  cancelPrompt: PropTypes.string
};

export default ModalDialog;
