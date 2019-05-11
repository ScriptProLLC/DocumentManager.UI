import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForDomChange
} from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentListItem from "./DocumentListItem";
import { createTestDocument } from "../../util/dataHelper";

describe("DocumentListItem component", () => {
  afterEach(cleanup);

  it("renders the name of the document", () => {
    var document = createTestDocument({ name: "Document Name" });

    const { getByText } = render(<DocumentListItem document={document} />);

    getByText(document.name);
  });

  it("renders the name of the document with unicode characters", () => {
    var document = createTestDocument({ name: "\u0913" });

    const { getByText } = render(<DocumentListItem document={document} />);

    getByText("ओ");
  });

  it("renders a default name if the name is null", () => {
    var document = createTestDocument({ name: null });

    const { getByText } = render(<DocumentListItem document={document} />);

    getByText("Unnamed Document");
  });

  it("renders a default name if the name is empty", () => {
    var document = createTestDocument({ name: "" });

    const { getByText } = render(<DocumentListItem document={document} />);

    getByText("Unnamed Document");
  });

  it("renders the dateCreated of the document", () => {
    var document = createTestDocument({
      dateCreated: "1997-01-01T06:30:16.25"
    });

    const { getByTestId } = render(<DocumentListItem document={document} />);

    expect(getByTestId("Date Created").textContent).toBe(
      "Date Created: 01/01/1997 6:30 AM"
    );
  });

  it("does not render a line for attributes if they are not included", () => {
    var document = createTestDocument({ attributes: null });

    const { getByTestId } = render(<DocumentListItem document={document} />);

    expect(getByTestId("attributesList").childElementCount).toBe(1);
  });

  it("renders a field for each attribute", () => {
    var document = createTestDocument({
      dateCreated: "1997-01-01T06:30:16.25",
      attributes: { attr1: "Hello", attr2: "World", attr3: "!" }
    });

    const { getByTestId } = render(<DocumentListItem document={document} />);

    expect(getByTestId("attributesList").childElementCount).toBe(4);
  });

  it("renders the correct text for an attribute", () => {
    var document = createTestDocument({
      attributes: { attr1: "Hello", attr2: "World" }
    });

    const { getByTestId } = render(<DocumentListItem document={document} />);

    expect(getByTestId("attr1").textContent).toBe(
      `attr1: ${document.attributes.attr1}`
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
