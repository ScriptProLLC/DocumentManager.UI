import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForDomChange
} from "react-testing-library";
import DocumentListItem from "./DocumentListItem";
import { createTestDocument } from "../../util/dataHelper";
import "jest-dom/extend-expect";

describe("DocumentListItem component", () => {
  afterEach(cleanup);

  it("renders the name of the document", () => {
    var document = createTestDocument({ name: "Document Name" });

    const { getByLabelText } = render(<DocumentListItem document={document} />);

    expect(
      getByLabelText("Document name for the document in the list").textContent
    ).toBe(document.name);
  });

  it("renders the name of the document with unicode characters", () => {
    var document = createTestDocument({ name: "\u0913" });

    const { getByLabelText } = render(<DocumentListItem document={document} />);

    expect(
      getByLabelText("Document name for the document in the list").textContent
    ).toBe("ओ");
  });

  it("renders a default name if the name is null", () => {
    var document = createTestDocument({ name: null });

    const { getByLabelText } = render(<DocumentListItem document={document} />);

    expect(
      getByLabelText("Document name for the document in the list").textContent
    ).toBe("Unnamed Document");
  });

  it("renders a default name if the name is empty", () => {
    var document = createTestDocument({ name: "" });

    const { getByLabelText } = render(<DocumentListItem document={document} />);

    expect(
      getByLabelText("Document name for the document in the list").textContent
    ).toBe("Unnamed Document");
  });

  it("renders the dateCreated of the document", () => {
    var document = createTestDocument({
      dateCreated: "1997-01-01T06:30:16.25"
    });

    const { getByLabelText } = render(<DocumentListItem document={document} />);

    expect(getByLabelText("Date Created").textContent).toBe(
      "Date Created: 01/01/1997 6:30 AM"
    );
  });

  it("does not render a line for attributes if they are not included", () => {
    var document = createTestDocument({ attributes: null });

    const { getByLabelText } = render(<DocumentListItem document={document} />);

    expect(
      getByLabelText("List of document attributes").childElementCount
    ).toBe(1);
  });

  it("renders a field for each attribute", () => {
    var document = createTestDocument({
      dateCreated: "1997-01-01T06:30:16.25",
      attributes: { attr1: "Hello", attr2: "World", attr3: "!" }
    });

    const { getByLabelText } = render(<DocumentListItem document={document} />);

    expect(
      getByLabelText("List of document attributes").childElementCount
    ).toBe(4);
  });

  it("renders the correct text for an attribute", () => {
    var document = createTestDocument({
      attributes: { attr1: "Hello", attr2: "World" }
    });

    const { getByLabelText } = render(<DocumentListItem document={document} />);

    expect(getByLabelText("attr1").textContent).toBe(
      `attr1: ${document.attributes.attr1}`
    );
  });

  it("hides the collapse by default", async () => {
    var document = createTestDocument();

    const { getByLabelText } = render(<DocumentListItem document={document} />);
    var elem = getByLabelText("Collapsable content container");

    expect(elem).not.toHaveClass("show");
  });

  it("toggles the collapse on click", async () => {
    var document = createTestDocument();

    const { container, getByLabelText } = render(
      <DocumentListItem document={document} />
    );

    fireEvent.click(
      getByLabelText("Toggle button to collapse extra document details")
    );
    await waitForDomChange(container);
    var elem = getByLabelText("Collapsable content container");

    expect(elem).toHaveClass("show");
  });
});
