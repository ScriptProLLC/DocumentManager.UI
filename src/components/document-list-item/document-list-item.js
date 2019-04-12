import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./document-list-item.css";
import {
  Collapse,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col
} from "reactstrap";

class DocumentListItem extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = {
      expanded: props.expanded ? props.expanded : false
    };
    this.reportToggle = props.reportToggle;
  }

  // Toggle Expansion
  toggle() {
    if (this.reportToggle) {
      this.reportToggle(this.state.expanded ? "collapsed" : "open");
    }

    this.setState(state => ({ expanded: !state.expanded }));
  }

  handleSelection() {
    if (this.props.onSelected) {
      this.props.onSelected("child " + this.props.index + " clicked");
    }
  }

  render() {
    // Expanded List - Item Template
    var documentAttributes = Object.entries({
      ...{ "Date Created": this.props.document.DateCreated },
      ...this.props.document.Attributes
    }).map(([key, value]) => (
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

    return (
      <div className="document-list-container">
        {/* Document Name + Expand Button */}
        <Row>
          <Col>
            <Button
              className="btn document-list-expand-button"
              data-testid="collapseToggle"
              onClick={this.toggle}
              outline
              size="sm"
            >
              {this.state.expanded ? (
                <i className="fa fa-caret-down fa-lg" />
              ) : (
                <i className="fa fa-caret-right fa-lg" />
              )}
            </Button>
            <div
              data-testid="documentName"
              className="document-list-item-name"
              onClick={this.handleSelection}
            >
              {this.props.document.Name || "Unnamed Document"}
            </div>
          </Col>
        </Row>

        {/* Expandable Section */}
        <Row>
          <Col>
            <Collapse isOpen={this.state.expanded} data-testid="collapse">
              <ListGroup>{documentAttributes}</ListGroup>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DocumentListItem;
