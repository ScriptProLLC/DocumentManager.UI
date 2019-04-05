import React, { Component } from "react";
import "./document-list-item.css";
import { Collapse, ListGroup, ListGroupItem, Button } from "reactstrap";

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
            {this.state.expanded ? <span>&#9660;</span> : <span>&#9658;</span>}
          </Button>
        </div>
        <Collapse isOpen={this.state.expanded} data-testid="collapse">
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
