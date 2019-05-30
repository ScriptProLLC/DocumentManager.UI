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

      expect(getByTestId("modal_header").textContent).toContain("Alert");
    });

    it("confirm button text", () => {
      const { getByTestId } = render(<ModalDialog showDialog={true} />);

      expect(getByTestId("modal_confirm_prompt").textContent).toBe("Confirm");
    });

    it("cancel button text", () => {
      const { getByTestId } = render(<ModalDialog showDialog={true} />);

      expect(getByTestId("modal_cancel_prompt").textContent).toContain(
        "Cancel"
      );
    });

    it("icon", () => {
      const { getByTestId } = render(<ModalDialog showDialog={true} />);

      expect(getByTestId("modal_icon").classList).toContain(
        "fa-exclamation-triangle"
      );
    });
  });

  describe("uses props: ", () => {
    it("prompt", () => {
      const { getByTestId } = render(
        <ModalDialog showDialog={true} prompt="test modal prompt" />
      );

      expect(getByTestId("modal_prompt").textContent.trim()).toBe(
        "test modal prompt"
      );
    });

    it("header", () => {
      const { getByTestId } = render(
        <ModalDialog showDialog={true} header="test modal header" />
      );

      expect(getByTestId("modal_header").children[0].textContent).toBe(
        "test modal header"
      );
    });

    it("confirm button text", () => {
      const { getByTestId } = render(
        <ModalDialog
          showDialog={true}
          confirmPrompt="test modal confirm prompt"
        />
      );

      expect(getByTestId("modal_confirm_prompt").textContent.trim()).toBe(
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

      expect(getByTestId("modal_cancel_prompt").textContent.trim()).toBe(
        "test modal cancel prompt"
      );
    });

    it("error icon", () => {
      const { getByTestId } = render(
        <ModalDialog showDialog={true} iconStyle="Error" />
      );

      expect(getByTestId("modal_icon").classList).toContain("fa-times");
    });

    it("info icon", () => {
      const { getByTestId } = render(
        <ModalDialog showDialog={true} iconStyle="Info" />
      );

      expect(getByTestId("modal_icon").classList).toContain("fa-info-circle");
    });

    it("autoFocus not set", () => {
      const { getByTestId } = render(
        <ModalDialog
          showDialog={true}
          iconStyle="Info"
          confirmPrompt="Yes"
          cancelPrompt="No"
        />
      );

      expect(getByTestId("modal_confirm_prompt")).not.toBe(
        document.activeElement
      );
      expect(getByTestId("modal_cancel_prompt")).not.toBe(
        document.activeElement
      );
    });

    it("autoFocus set to confirm button", () => {
      const { getByTestId } = render(
        <ModalDialog
          showDialog={true}
          iconStyle="Info"
          confirmPrompt="Yes"
          cancelPrompt="No"
          autoFocus="Yes"
        />
      );

      expect(getByTestId("modal_confirm_prompt")).toBe(document.activeElement);
      expect(getByTestId("modal_cancel_prompt")).not.toBe(
        document.activeElement
      );
    });

    it("autoFocus set to cancel button", () => {
      const { getByTestId } = render(
        <ModalDialog
          showDialog={true}
          iconStyle="Info"
          confirmPrompt="Yes"
          cancelPrompt="No"
          autoFocus="No"
        />
      );

      expect(getByTestId("modal_confirm_prompt")).not.toBe(
        document.activeElement
      );
      expect(getByTestId("modal_cancel_prompt")).toBe(document.activeElement);
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

            fireEvent.click(getByTestId("modal_confirm_prompt"));

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

            fireEvent.click(getByTestId("modal_confirm_prompt"));

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

            fireEvent.click(getByTestId("modal_cancel_prompt"));

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

            fireEvent.click(getByTestId("modal_cancel_prompt"));

            expect(mockResultCallback).toBeCalledWith("Custom cancel prompt");
          });
        });

        describe("close click", () => {
          it("calls callback with default prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByTestId } = render(
              <ModalDialog
                showDialog={true}
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByTestId("modal_header").children[1]);

            expect(mockResultCallback).toBeCalledWith("Cancel");
          });

          it("calls callback with custom prompt", async () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByTestId } = render(
              <ModalDialog
                showDialog={true}
                cancelPrompt="Custom cancel prompt"
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByTestId("modal_header").children[1]);

            expect(mockResultCallback).toBeCalledWith("Custom cancel prompt");
          });
        });
      });
    });
  });
});
