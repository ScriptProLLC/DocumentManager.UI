import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./ModalDialog.css";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalDialog({
  header,
  iconStyle,
  cancelPrompt,
  confirmPrompt,
  reportResult,
  toggle,
  showDialog,
  prompt
}) {
  function confirmClick() {
    if (reportResult) reportResult(confirmPrompt);
  }

  function cancelClick() {
    if (reportResult) reportResult(cancelPrompt);
  }

  const handleToggle = () => {
    toggle ? toggle() : reportResult(cancelPrompt);
  };

  const iconStyleCheck = style => {
    return style === iconStyle ? "icon-shown fa-stack fa-lg" : "icon-hidden";
  };

  return (
    <div>
      <Modal isOpen={showDialog} toggle={handleToggle}>
        <ModalHeader toggle={toggle}>{header}</ModalHeader>
        <ModalBody>
          <span className={iconStyleCheck("Info")}>
            <i className="fa fa-2x fa-info-circle info-blue" />
          </span>
          <span className={iconStyleCheck("Warning")}>
            <i className="fa fa-exclamation fa-stack-2x fa-inverse warning-exclamation" />
            <i className="fa fa-exclamation-triangle fa-stack-2x warning-yellow" />
          </span>
          <span className={iconStyleCheck("Error")}>
            <i className="fa fa-times fa-stack-2x error-red" />
          </span>
          <span>
            &nbsp;
            {prompt}
          </span>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={confirmClick}>
            {confirmPrompt}
          </Button>
          <Button variant="secondary" onClick={cancelClick}>
            {cancelPrompt}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

// Define PropTypes For Document List Item
ModalDialog.propTypes = {
  header: PropTypes.string,
  prompt: PropTypes.string.isRequired,
  confirmPrompt: PropTypes.string,
  cancelPrompt: PropTypes.string,
  iconStyle: PropTypes.oneOf(["Warning", "Info", "Error"]),
  reportResult: PropTypes.func
};

ModalDialog.defaultProps = {
  header: "Alert",
  iconStyle: "Warning",
  cancelPrompt: "Cancel",
  confirmPrompt: "Confirm",
  reportResult: null
};

export default ModalDialog;
