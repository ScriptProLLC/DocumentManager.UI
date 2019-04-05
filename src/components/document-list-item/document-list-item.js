import React, { Component } from "react";
import "./document-list-item.css";
import { Collapse, ListGroup, ListGroupItem, Button } from "reactstrap";

class DocumentListItem extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };

    this.reportToggle = props.reportToggle;
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));

    if (this.reportToggle) {
      this.reportToggle(this.state.collapse ? "collapsed" : "open");
    }
  }

  render() {
    var attributes = Object.entries(this.props.document.Attributes).map(
      ([key, value], index) => (
        <ListGroupItem key={key}>{key + ": " + value}</ListGroupItem>
      )
    );

    return (
      <div className="DocumentListItem">
        <div>
          <span data-testid="documentName">{this.props.document.Name}</span>
          <Button
            outline
            color="secondary"
            onClick={this.toggle}
            style={{ marginBottom: "1rem" }}
            data-testid="collapseToggle"
          >
            {this.state.collapse ? <span>&#9660;</span> : <span>&#9658;</span>}
          </Button>
        </div>
        <Collapse isOpen={this.state.collapse} data-testid="collapse">
          <ListGroup>
            <ListGroupItem data-testid="dateCreatedField">
              {"Date Created: " + this.props.document.DateCreated}
            </ListGroupItem>
            {attributes}
          </ListGroup>
        </Collapse>
      </div>
    );
  }
}

export default DocumentListItem;
