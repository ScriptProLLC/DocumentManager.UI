import React, { useState } from "react";
import PropTypes from "prop-types";
import { documentPropType } from "./../../../propTypes";
import ModalDialog from "../../ModalDialog/ModalDialog";
import { Container, Row, Col } from "reactstrap";
import IconButton from "./../../IconButton/IconButton";
import { ActionTypes } from "../../DocumentManager/Model/ActionTypes";
import "./DocumentActionsPanel.scss";

export default function DocumentActionsPanel(props) {
  const [showModalDialog, setShowModalDialog] = useState(false);

  // Handle Delete Click
  const onDeleteClick = () => {
    setShowModalDialog(true);
  };

  // Edit
  const onEditClick = () => {
    props.dispatchDocumentAction({ type: ActionTypes.EDIT_DOCUMENT });
  };

  // Delete Dispatch Action
  async function onDeleteConfirmationReport(report) {
    setShowModalDialog(false);

    if (report === "Yes") {
      await props.dispatchDocumentAction({
        type: ActionTypes.DELETE_ACTIVE_DOCUMENT
      });
    }
  }

  return (
    <Container
      fluid
      className="document-actions-container"
      aria-label="Document actions panel"
    >
      <Row className="h-100">
        <Col className="my-auto truncate">
          <span>{props.document.name || "Unnamed Document"}</span>
        </Col>
        <Col xs="auto" className="my-auto text-right">
          <IconButton
            className="mr-3"
            color="white"
            aria-label="Edit button"
            icon="pencil"
            onClick={onEditClick}
            size="lg"
          />
          <IconButton
            color="white"
            aria-label="Delete button"
            icon="trash-o"
            onClick={onDeleteClick}
            size="lg"
          />
        </Col>
      </Row>

      {/* Modal */}
      <ModalDialog
        autoFocus="No"
        showDialog={showModalDialog}
        reportResult={onDeleteConfirmationReport}
        confirmPrompt="Yes"
        cancelPrompt="No"
        prompt="Are you sure you want to delete the selected document?"
      />
    </Container>
  );
}

// Define PropTypes For Document Actions Panel
DocumentActionsPanel.propTypes = {
  document: documentPropType.isRequired,
  dispatchDocumentAction: PropTypes.func
};
