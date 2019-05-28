import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../util/dateUtilities";
import {
  Collapse,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col
} from "reactstrap";
import "./DocumentListItem.scss";

export default function DocumentListItem(props) {
  let [expanded, setExpanded] = useState(props.expanded);
  let listItems = {
    ...{ "Date Created": formatDate(props.document.dateCreated) },
    ...props.document.attributes
  };

  function toggle() {
    if (props.reportToggle) {
      props.reportToggle(expanded ? "collapsed" : "open");
    }

    setExpanded(!expanded);
  }

  function select() {
    if (props.onSelected) {
      props.onSelected(props.document);
    }
  }

  function renderListItems() {
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
            color="dark-grey"
            data-testid="collapse_toggle"
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
            data-testid="document_name"
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
          <Collapse isOpen={expanded} data-testid="collapse" onClick={select}>
            <ListGroup data-testid="attributes_list">
              {renderListItems()}
            </ListGroup>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}

DocumentListItem.propTypes = {
  document: PropTypes.shape({
    name: PropTypes.string,
    dateCreated: PropTypes.string.isRequired,
    attributes: PropTypes.object
  }),
  expanded: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelected: PropTypes.func,
  reportToggle: PropTypes.func
};
