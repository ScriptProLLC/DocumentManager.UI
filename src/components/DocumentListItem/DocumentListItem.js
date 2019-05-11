import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./DocumentListItem.css";
import PropTypes from "prop-types";
import { formatDate } from "../../util/dates";
import {
  Collapse,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col
} from "reactstrap";

function DocumentListItem(props) {
  let [expanded, setExpanded] = useState(props.expanded);
  let listItems = {
    ...{ "Date Created": formatDate(props.document.dateCreated) },
    ...props.document.attributes
  };

  // Suggest being consistent about nested function styles.
  const toggle = () => {
    if (props.reportToggle) {
      props.reportToggle(expanded ? "collapsed" : "open");
    }

    setExpanded(!expanded);
  };

  const select = () => {
    if (props.onSelected) {
      props.onSelected(props.document);
    }
  };

  // Suggest renaming to renderListItems
  function displayListItems() {
    return Object.entries(listItems).map(([key, value]) => (
      <ListGroupItem
        key={key}
        className="document-list-expanded-item"
        data-testid={key}
      >
        <span className="fa fa-level-up mr-3" />
        <strong>{key}: </strong>
        {value}
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
    >
      {/* Document Name + Expand Button */}
      <Row>
        <Col>
          <Button
            className="btn document-list-expand-button"
            data-testid="collapseToggle"
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
            data-testid="documentName"
            className="document-list-item-name"
            onClick={select}
          >
            <i className={props.isSelected ? "fa fa-file" : "fa fa-file-o"} />
            {props.document.name || "Unnamed Document"}
          </div>
        </Col>
      </Row>

      {/* Expandable Section */}
      <Row>
        <Col>
          <Collapse isOpen={expanded} data-testid="collapse" onClick={select}>
            <ListGroup data-testid="attributesList">
              {displayListItems()}
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
    dateCreated: PropTypes.string.isRequired,
    attributes: PropTypes.object
  })
};

export default DocumentListItem;
