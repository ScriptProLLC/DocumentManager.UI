import React, { Component } from "react";
import "./document-list-item.css";
import { Collapse, ListGroup, ListGroupItem, Button } from "reactstrap";

class DocumentListItem extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
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
          <span id="documentName">{this.props.document.Name}</span>
          <Button
            outline
            color="secondary"
            onClick={this.toggle}
            style={{ marginBottom: "1rem" }}
            id="collapseToggle"
          >
            {this.state.collapse ? <span>&#9660;</span> : <span>&#9658;</span>}
          </Button>
        </div>
        <Collapse isOpen={this.state.collapse} id="collapse">
          <ListGroup>
            <ListGroupItem id="dateCreatedField">
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
