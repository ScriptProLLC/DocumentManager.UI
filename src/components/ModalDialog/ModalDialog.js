import React from "react";
import "./ModalDialog.css";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalDialog(props) {
  let header = props.header || "Alert";
  let iconStyle = props.iconStyle || "Warning";
  let cancelPrompt = props.cancelPrompt || "Cancel";
  let confirmPrompt = props.confirmPrompt || "Confirm";

  // Confirm
  function confirmClick() {
    if (props.reportResult) {
      props.reportResult(props.confirmPrompt);
    }
  }

  // Cancel
  function cancelClick() {
    if (props.reportResult) {
      props.reportResult(props.cancelPrompt);
    }
  }

  // Toggle
  const toggle = () => {
    if (props.toggle) {
      props.toggle();
    } else {
      props.reportResult(props.cancelPrompt);
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
    <Modal isOpen={props.showDialog} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <i className={iconClass(iconStyle) + " mr-3"} />
        <span className="modal-header-text">{header}</span>
      </ModalHeader>
      <ModalBody>
        <p>{props.prompt}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={confirmClick}>
          {confirmPrompt}
        </Button>
        <Button color="grey" onClick={cancelClick}>
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
