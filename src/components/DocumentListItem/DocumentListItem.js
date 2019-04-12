import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./DocumentListItem.css";
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
    ...{ "Date Created": props.document.DateCreated },
    ...props.document.Attributes
  };

  const toggle = () => {
    if (props.reportToggle) {
      props.reportToggle(expanded ? "collapsed" : "open");
    }

    setExpanded(!expanded);
  };

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
    <div className="document-list-container">
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
            {expanded ? (
              <i className="fa fa-caret-down fa-lg" />
            ) : (
              <i className="fa fa-caret-right fa-lg" />
            )}
          </Button>
          <div data-testid="documentName" className="document-list-item-name">
            {props.document.Name || "Unnamed Document"}
          </div>
        </Col>
      </Row>

      {/* Expandable Section */}
      <Row>
        <Col>
          <Collapse isOpen={expanded} data-testid="collapse">
            <ListGroup data-testid="attributesList">
              {displayListItems()}
            </ListGroup>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}

export default DocumentListItem;