import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForDomChange
} from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentListItem from "./document-list-item";
import { createTestDocument } from "./../../util/dataHelper";

describe("DocumentListItem component", () => {
  afterEach(cleanup);

  it("renders the name of the document", () => {
    var document = createTestDocument({ Name: "Document Name" });

    const { getByTestId } = render(<DocumentListItem document={document} />);

    expect(getByTestId("documentName").textContent).toBe(document.Name);
  });

  it("renders the name of the document with unicode characters", () => {
    var document = createTestDocument({ Name: "\u0913" });

    const { getByTestId } = render(<DocumentListItem document={document} />);

    expect(getByTestId("documentName").textContent).toBe("ओ");
  });

  it("renders the dateCreated of the document", () => {
    var document = createTestDocument({ DateCreated: "01/01/1970 09:22 AM" });

    const { getByTestId } = render(<DocumentListItem document={document} />);

    expect(getByTestId("dateCreatedField").textContent).toBe(
      `Date Created: ${document.DateCreated}`
    );
  });

  it("does not render a line for attributes if they are not included", () => {
    var document = createTestDocument({ Attributes: {} });

    const { container } = render(<DocumentListItem document={document} />);

    expect(container.querySelectorAll(".list-group-item").length).toBe(1);
  });

  it("renders a field for each attribute", () => {
    var document = createTestDocument({
      DateCreated: "01/01/1970 09:22 AM",
      Attributes: { attr1: "Hello", attr2: "World", attr3: "!" }
    });

    const { container } = render(<DocumentListItem document={document} />);

    expect(container.querySelectorAll(".list-group-item").length).toBe(4);
  });

  it("renders the correct text for an attribute", () => {
    var document = createTestDocument({
      Attributes: { attr1: "Hello", attr2: "World" }
    });

    const { container } = render(<DocumentListItem document={document} />);

    expect(container.querySelectorAll("li")[1].textContent).toBe(
      `attr1: ${document.Attributes.attr1}`
    );
  });

  it("hides the collapse by default", async () => {
    var document = createTestDocument();

    const { getByTestId } = render(<DocumentListItem document={document} />);
    var elem = getByTestId("collapse");

    expect(elem).not.toHaveClass("show");
  });

  it("toggles the collapse on click", async () => {
    var document = createTestDocument();

    const { container, getByTestId } = render(
      <DocumentListItem document={document} />
    );

    fireEvent.click(getByTestId("collapseToggle"));
    await waitForDomChange(container);
    var elem = getByTestId("collapse");

    expect(elem).toHaveClass("show");
  });
});
