import React, { useState } from "react";
import PropTypes from "prop-types";
import { documentPropType } from "./../../../propTypes";
import { Input, Container, Row, Col } from "reactstrap";
import "./DocumentEditPanel.scss";
import IconButton from "./../../IconButton/IconButton";
import { ActionTypes } from "../../DocumentManager/Model/ActionTypes";

export default function DocumentEditPanel(props) {
  let [document, setDocument] = useState(props.document);

  const onSave = async () => {
    await props.dispatchDocumentAction({
      type: ActionTypes.SAVE_DOCUMENT,
      document: document
    });
  };

  const onCancel = async () => {
    await props.dispatchDocumentAction({
      type: ActionTypes.CANCEL_EDIT_DOCUMENT
    });
  };

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
            data-testid="document_edit_document_name"
            placeholder="Unnamed Document"
            value={document.name || ""}
            onChange={onDocumentNameChange}
          />
        </Col>
        <Col xs="4" className="my-auto text-right">
          <IconButton
            className="mr-3"
            color="white"
            data-testid="save_button"
            icon="save"
            onClick={onSave}
            size="lg"
          />
          <IconButton
            color="white"
            data-testid="cancel_button"
            icon="times"
            onClick={onCancel}
            size="lg"
          />
        </Col>
      </Row>
    </Container>
  );
}

DocumentEditPanel.propTypes = {
  document: documentPropType.isRequired,
  dispatchDocumentAction: PropTypes.func
};
