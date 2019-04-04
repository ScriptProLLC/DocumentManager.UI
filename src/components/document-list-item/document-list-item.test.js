import React from "react";
import { render } from "react-testing-library";
import DocumentListItem from "./document-list-item";

describe("DocumentListItem component", () => {
  it("displays the name of the document", () => {
    var document = {
      Name: "name",
      DateCreated: "date",
      Attributes: { attr1: "Hello", attr2: "World" }
    };

    const { container } = render(<DocumentListItem document={document} />);
    expect(container.querySelector("#documentName").textContent).toBe(
      document.Name
    );
  });

  it("displays the dateCreated of the document", () => {
    var document = {
      Name: "name",
      DateCreated: "01/01/1970 09:22 AM",
      Attributes: { attr1: "Hello", attr2: "World" }
    };

    const { container } = render(<DocumentListItem document={document} />);
    expect(container.querySelector("#dateCreatedField").textContent).toBe(
      `Date Created: ${document.DateCreated}`
    );
  });

  it("displays a field for each attribute", () => {
    var document = {
      Name: "name",
      DateCreated: "01/01/1970 09:22 AM",
      Attributes: { attr1: "Hello", attr2: "World", attr3: "!" }
    };

    const { container } = render(<DocumentListItem document={document} />);
    expect(container.querySelectorAll("li").length).toBe(4);
  });

  it("displays the correct text for an attribute", () => {
    var document = {
      Name: "name",
      DateCreated: "01/01/1970 09:22 AM",
      Attributes: { attr1: "Hello", attr2: "World", attr3: "!" }
    };

    const { container } = render(<DocumentListItem document={document} />);
    expect(container.querySelectorAll("li")[1].textContent).toBe(
      `attr1: ${document.Attributes.attr1}`
    );
  });
});
