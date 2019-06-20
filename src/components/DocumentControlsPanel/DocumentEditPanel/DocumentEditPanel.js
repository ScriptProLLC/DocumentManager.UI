import React, { useState } from "react";
import PropTypes from "prop-types";
import { documentPropType } from "./../../../propTypes";
import { Input, Container, Row, Col } from "reactstrap";
import IconButton from "./../../IconButton/IconButton";
import { ActionTypes } from "../../DocumentManager/Model/ActionTypes";
import "./DocumentEditPanel.scss";

export default function DocumentEditPanel(props) {
  let [document, setDocument] = useState(props.document);

  // Save
  const onSave = async () => {
    await props.dispatchDocumentAction({
      type: ActionTypes.SAVE_DOCUMENT,
      document: document
    });
  };

  // Cancel
  const onCancel = async () => {
    await props.dispatchDocumentAction({
      type: ActionTypes.CANCEL_EDIT_DOCUMENT
    });
  };

  // Change Document Name
  const onDocumentNameChange = event => {
    var newDoc = Object.assign({}, document);
    newDoc.name = event.target.value;
    setDocument(newDoc);
  };

  return (
    <Container fluid className="document-edit-container">
      <Row className="h-100">
        <Col xs="8" className="my-auto">
          <Input
            aria-label="Document name in document edit panel"
            placeholder="Unnamed Document"
            value={document.name || ""}
            onChange={onDocumentNameChange}
          />
        </Col>
        <Col xs="4" className="my-auto text-right">
          <IconButton
            className="mr-3"
            color="white"
            aria-label="Save button"
            icon="save"
            onClick={onSave}
            size="lg"
          />
          <IconButton
            color="white"
            aria-label="Cancel button"
            icon="times"
            onClick={onCancel}
            size="lg"
          />
        </Col>
      </Row>
    </Container>
  );
}

// Define PropTypes For Document Edit Panel
DocumentEditPanel.propTypes = {
  document: documentPropType.isRequired,
  dispatchDocumentAction: PropTypes.func
};
