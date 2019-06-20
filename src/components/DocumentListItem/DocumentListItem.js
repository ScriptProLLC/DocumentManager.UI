import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../util/dateUtilities";
import { formatAttribute } from "../../util/attributesUtilities";
import {
  Collapse,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col
} from "reactstrap";
import { ActionTypes } from "../DocumentManager/Model/ActionTypes";
import "./DocumentListItem.scss";

export default function DocumentListItem(props) {
  let [expanded, setExpanded] = useState(props.expanded);
  let listItems = {
    ...{ "Date Created": formatDate(props.document.dateCreated) },
    ...props.document.attributes
  };

  // Toggle Collapse
  function toggle() {
    if (props.reportToggle) {
      props.reportToggle(expanded ? "collapsed" : "open");
    }

    setExpanded(!expanded);
  }

  // Dispatch Actions
  async function select() {
    await props.dispatchDocumentAction({
      type: ActionTypes.SELECT_DOCUMENT,
      document: props.document
    });
  }

  // Render List Items
  function renderListItems() {
    return Object.entries(listItems).map(([key, value]) => (
      <ListGroupItem
        key={key}
        className="document-list-expanded-item"
        aria-label={key}
      >
        <span className="fa fa-level-up mr-3" />
        <strong>{key}: </strong>
        {formatAttribute(key, value)}
      </ListGroupItem>
    ));
  }

  return (
    <div
      className={
        props.isSelected
          ? "document-list-item-container selected"
          : "document-list-item-container"
      }
      role="listitem"
    >
      {/* Document Name + Expand Button */}
      <Row>
        <Col>
          <Button
            className="btn document-list-expand-button"
            color="dark-grey"
            aria-label="Toggle button to collapse extra document details"
            onClick={toggle}
            outline
            size="sm"
          >
            <i
              className={
                expanded ? "fa fa-caret-down fa-lg" : "fa fa-caret-right fa-lg"
              }
            />
          </Button>
          <div
            aria-label="Document name for the document in the list"
            className="document-list-item-name"
            onClick={select}
          >
            <i
              className={
                props.isSelected ? "fa fa-file mr-3" : "fa fa-file-o mr-3"
              }
            />
            <span className={props.isSelected ? "text-dark-grey" : ""}>
              {props.document.name || "Unnamed Document"}
            </span>
          </div>
        </Col>
      </Row>

      {/* Expandable Section */}
      <Row>
        <Col>
          <Collapse
            isOpen={expanded}
            aria-label="Collapsable content container"
            onClick={select}
          >
            <ListGroup aria-label="List of document attributes">
              {renderListItems()}
            </ListGroup>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}

// Define PropTypes For Document List Item
DocumentListItem.propTypes = {
  document: PropTypes.shape({
    name: PropTypes.string,
    dateCreated: PropTypes.string,
    attributes: PropTypes.object
  }),
  expanded: PropTypes.bool,
  isSelected: PropTypes.bool,
  dispatchDocumentAction: PropTypes.func,
  reportToggle: PropTypes.func
};
