import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForDomChange
} from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentListItem from "./document-list-item";

describe("DocumentListItem component", () => {
  afterEach(cleanup);

  it("renders the name of the document", () => {
    var document = {
      Name: "name",
      DateCreated: "date",
      Attributes: { attr1: "Hello", attr2: "World" }
    };

    const { getByTestId } = render(<DocumentListItem document={document} />);

    expect(getByTestId("documentName").textContent).toBe(document.Name);
  });

  it("renders the dateCreated of the document", () => {
    var document = {
      Name: "name",
      DateCreated: "01/01/1970 09:22 AM",
      Attributes: { attr1: "Hello", attr2: "World" }
    };

    const { getByTestId } = render(<DocumentListItem document={document} />);

    expect(getByTestId("dateCreatedField").textContent).toBe(
      `Date Created: ${document.DateCreated}`
    );
  });

  it("renders a field for each attribute", () => {
    var document = {
      Name: "name",
      DateCreated: "01/01/1970 09:22 AM",
      Attributes: { attr1: "Hello", attr2: "World", attr3: "!" }
    };

    const { container } = render(<DocumentListItem document={document} />);

    expect(container.querySelectorAll(".list-group-item").length).toBe(4);
  });

  it("renders the correct text for an attribute", () => {
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

  it("hides the collapse by default", async () => {
    var document = {
      Name: "name",
      DateCreated: "01/01/1970 09:22 AM",
      Attributes: { attr1: "Hello", attr2: "World", attr3: "!" }
    };

    const { getByTestId } = render(<DocumentListItem document={document} />);
    var elem = getByTestId("collapse");

    expect(elem).not.toHaveClass("show");
  });

  it("toggles the collapse on click", async () => {
    var document = {
      Name: "name",
      DateCreated: "01/01/1970 09:22 AM",
      Attributes: { attr1: "Hello", attr2: "World", attr3: "!" }
    };

    const { container, getByTestId } = render(
      <DocumentListItem document={document} />
    );

    fireEvent.click(getByTestId("collapseToggle"));
    await waitForDomChange(container);
    var elem = getByTestId("collapse");

    expect(elem).toHaveClass("show");
  });
});
