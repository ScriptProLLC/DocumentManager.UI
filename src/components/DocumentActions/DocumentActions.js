import React, { useState } from "react";
import ModalDialog from "../ModalDialog/ModalDialog";
import { Container, Row, Col } from "reactstrap";
import "./DocumentActions.scss";

function DocumentActions(props) {
  let documentName =
    props.document && props.document.name
      ? props.document.name
      : "Unnamed Document";

  const [showModalDialog, setShowModalDialog] = useState(false);

  const onDeleteClick = () => {
    setShowModalDialog(true);
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
            {documentName}
          </span>
        </Col>
        <Col xs="4" className="my-auto text-right">
          <div
            className="delete-button"
            onClick={onDeleteClick}
            data-testid="document_actions_delete_button"
          >
            <i className="fa fa-trash-o" />
          </div>
        </Col>
      </Row>

      {/* Modal */}
      <ModalDialog
        showDialog={showModalDialog}
        reportResult={onDeleteConfirmationReport}
        confirmPrompt="Yes"
        cancelPrompt="No"
        prompt="Are you sure you want to delete the selected document?"
      />
    </Container>
  );
}

export default DocumentActions;
