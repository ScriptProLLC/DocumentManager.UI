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
    this.state = { expanded: props.expanded ? props.expanded : false };

    this.reportToggle = props.reportToggle;
  }

  toggle() {
    if (this.reportToggle) {
      this.reportToggle(this.state.expanded ? "collapsed" : "open");
    }

    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    var attributes = Object.entries(this.props.document.Attributes).map(
      ([key, value], index) => (
        <ListGroupItem key={key}>{key + ": " + value}</ListGroupItem>
      )
    );

    return (
      <div className="container">
        <Row className="border-white">
          <Col>
            <span data-testid="documentName">{this.props.document.Name}</span>
          </Col>
          <Col>
            <Button
              outline
              color="secondary"
              onClick={this.toggle}
              className="btn btn-sm clearfix"
              data-testid="collapseToggle"
            >
              {this.state.expanded ? (
                <i className="fa fa-caret-down" />
              ) : (
                <i className="fa fa-caret-right" />
              )}
            </Button>
          </Col>
        </Row>
        <Row className="border-0">
          <Col xs="12">
            <Collapse isOpen={this.state.expanded} data-testid="collapse">
              <ListGroupItem data-testid="dateCreatedField">
                {"Date Created: " + this.props.document.DateCreated}
              </ListGroupItem>
              <ListGroup>{attributes}</ListGroup>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DocumentListItem;
