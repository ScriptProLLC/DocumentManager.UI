import React, { useState } from "react";
import PropTypes from "prop-types";
import { documentPropType } from "../../propTypes";
import { Input, Container, Row, Col } from "reactstrap";
import "./DocumentEdit.scss";
import IconButton from "./../IconButton/IconButton";

export default function DocumentEdit(props) {
  let [document, setDocument] = useState(props.document);

  const onSave = async () => {
    await props.dispatchDocumentAction({
      type: "editAction",
      document: document
    });
    props.setInEditMode(false);
  };

  const onCancel = () => {
    props.setInEditMode(false);
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
            value={document.name}
            onChange={onDocumentNameChange}
          />
        </Col>
        <Col xs="3" className="my-auto text-right">
          <IconButton
            data-testid="save_button"
            icon="fa fa-save"
            onClick={onSave}
          />
          <IconButton
            data-testid="cancel_button"
            icon="fa fa-times"
            onClick={onCancel}
          />
        </Col>
      </Row>
    </Container>
  );
}

DocumentEdit.propTypes = {
  document: documentPropType.isRequired,
  dispatchDocumentAction: PropTypes.func,
  setInEditMode: PropTypes.func
};