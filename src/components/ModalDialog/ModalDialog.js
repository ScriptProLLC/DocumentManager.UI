import React from "react";
import Icon from "../Icon";
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

  return (
    <div>
      <Modal isOpen={showDialog} toggle={handleToggle}>
        <ModalHeader toggle={toggle}>{header}</ModalHeader>
        <ModalBody>
          <Icon type={iconStyle} />
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
  iconStyle: PropTypes.oneOf(["warning", "info", "error"]),
  toggle: PropTypes.func,
  reportResult: PropTypes.func
};

ModalDialog.defaultProps = {
  header: "Alert",
  iconStyle: "warning",
  cancelPrompt: "Cancel",
  confirmPrompt: "Confirm",
  reportResult: null
};

export default ModalDialog;
