import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import ModalDialog from "./ModalDialog";

describe("ModalDialog component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders", () => {
    const { getByTestId } = render(<ModalDialog showDialog={true} />);

    expect(getByTestId("modal")).toBeTruthy();
  });

  describe("default", () => {
    it("header", () => {
      const { getByTestId } = render(<ModalDialog showDialog={true} />);

      expect(getByTestId("modal-header").textContent).toContain("Alert");
    });

    it("confirm button text", () => {
      const { getByTestId } = render(<ModalDialog showDialog={true} />);

      expect(getByTestId("modal-confirm-prompt").textContent).toBe("Confirm");
    });

    it("cancel button text", () => {
      const { getByTestId } = render(<ModalDialog showDialog={true} />);

      expect(getByTestId("modal-cancel-prompt").textContent).toContain(
        "Cancel"
      );
    });

    it("icon", () => {
      const { getByTestId } = render(<ModalDialog showDialog={true} />);

      expect(getByTestId("modal-icon").classList).toContain(
        "fa-exclamation-triangle"
      );
    });
  });

  describe("uses props: ", () => {
    it("prompt", () => {
      const { getByTestId } = render(
        <ModalDialog showDialog={true} prompt="test modal prompt" />
      );

      expect(getByTestId("modal-prompt").textContent.trim()).toBe(
        "test modal prompt"
      );
    });

    it("confirm button text", () => {
      const { getByTestId } = render(
        <ModalDialog
          showDialog={true}
          confirmPrompt="test modal confirm prompt"
        />
      );

      expect(getByTestId("modal-confirm-prompt").textContent.trim()).toBe(
        "test modal confirm prompt"
      );
    });

    it("cancel button text", () => {
      const { getByTestId } = render(
        <ModalDialog
          showDialog={true}
          cancelPrompt="test modal cancel prompt"
        />
      );

      expect(getByTestId("modal-cancel-prompt").textContent.trim()).toBe(
        "test modal cancel prompt"
      );
    });

    it("error icon", () => {
      const { getByTestId } = render(
        <ModalDialog showDialog={true} iconStyle="Error" />
      );

      expect(getByTestId("modal-icon").classList).toContain("fa-times");
    });

    it("info icon", () => {
      const { getByTestId } = render(
        <ModalDialog showDialog={true} iconStyle="Info" />
      );

      expect(getByTestId("modal-icon").classList).toContain("fa-info-circle");
    });

    describe("events", () => {
      describe("result reporting", () => {
        describe("confirm click", () => {
          it("calls callback with default prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByTestId } = render(
              <ModalDialog
                showDialog={true}
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByTestId("modal-confirm-prompt"));

            expect(mockResultCallback).toBeCalledWith("Confirm");
          });

          it("calls callback with custom prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByTestId } = render(
              <ModalDialog
                showDialog={true}
                confirmPrompt="Custom confirm propmpt"
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByTestId("modal-confirm-prompt"));

            expect(mockResultCallback).toBeCalledWith("Custom confirm propmpt");
          });
        });

        describe("cancel click", () => {
          it("calls callback with default prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByTestId } = render(
              <ModalDialog
                showDialog={true}
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByTestId("modal-cancel-prompt"));

            expect(mockResultCallback).toBeCalledWith("Cancel");
          });

          it("calls callback with custom prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByTestId } = render(
              <ModalDialog
                showDialog={true}
                cancelPrompt="Custom cancel prompt"
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByTestId("modal-cancel-prompt"));

            expect(mockResultCallback).toBeCalledWith("Custom cancel prompt");
          });
        });

        describe("close click", () => {
          it("calls callback with default prompt", () => {});
          it("calls callback with custom prompt", async () => {});
        });
      });
    });
  });
});
