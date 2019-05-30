import React, { useState } from "react";
import PropTypes from "prop-types";
import { documentPropType } from "../../propTypes";
import ModalDialog from "../ModalDialog/ModalDialog";
import { Container, Row, Col } from "reactstrap";
import "./DocumentActions.scss";
import IconButton from "../IconButton/IconButton";

export default function DocumentActions(props) {
  const [showModalDialog, setShowModalDialog] = useState(false);

  const onDeleteClick = () => {
    setShowModalDialog(true);
  };

  const onEditClick = () => {
    props.setInEditMode(true);
  };

  async function onDeleteConfirmationReport(report) {
    setShowModalDialog(false);

    if (report === "Yes") {
      await props.dispatchDocumentAction({
        type: "deleteAction"
      });
    }
  }

  return (
    <Container fluid className="document-actions-container">
      <Row className="h-100">
        <Col xs="8" className="my-auto">
          <span data-testid="document_action_document_name">
            {props.document.name || "Unnamed Document"}
          </span>
        </Col>
        <Col xs="3" className="my-auto text-right">
          <IconButton
            data-testid="edit_button"
            icon="fa fa-pencil-square-o"
            onClick={onEditClick}
          />
          <IconButton
            data-testid="delete_button"
            icon="fa fa-trash-o"
            onClick={onDeleteClick}
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

DocumentActions.propTypes = {
  document: documentPropType.isRequired,
  dispatchDocumentAction: PropTypes.func,
  setInEditMode: PropTypes.func
};
