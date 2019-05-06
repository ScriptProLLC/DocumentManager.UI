import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./ModalDialog.css";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalDialog(props) {
  let header = props.header || "Alert";
  let iconStyle = props.iconStyle || "Warning";
  let cancelPrompt = props.cancelPrompt || "Cancel";
  let confirmPrompt = props.confirmPrompt || "Confirm";

  function confirmClick() {
    if (props.reportResult) {
      props.reportResult(props.confirmPrompt);
    }
  }

  function cancelClick() {
    if (props.reportResult) {
      props.reportResult(props.cancelPrompt);
    }
  }

  const toggle = () => {
    if (props.toggle) {
      props.toggle();
    } else {
      props.reportResult(props.cancelPrompt);
    }
  };

  const iconStyleCheck = style => {
    return style === iconStyle ? "icon-shown fa-stack fa-lg" : "icon-hidden";
  };

  return (
    <div>
      <Modal isOpen={props.showDialog} toggle={toggle}>
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
            {props.prompt}
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
  prompt: PropTypes.string,
  confirmPrompt: PropTypes.string,
  cancelPrompt: PropTypes.string
};

export default ModalDialog;
