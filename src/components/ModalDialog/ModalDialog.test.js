import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import ModalDialog from "./ModalDialog";
import "jest-dom/extend-expect";

describe("ModalDialog component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders", () => {
    const { getByLabelText } = render(<ModalDialog showDialog={true} />);

    expect(getByLabelText("Modal")).toBeTruthy();
  });

  describe("default", () => {
    it("header", () => {
      const { getByLabelText } = render(<ModalDialog showDialog={true} />);

      expect(getByLabelText("Modal header").textContent).toContain("Alert");
    });

    it("confirm button text", () => {
      const { getByLabelText } = render(<ModalDialog showDialog={true} />);

      expect(getByLabelText("Modal confirm button").textContent).toBe(
        "Confirm"
      );
    });

    it("cancel button text", () => {
      const { getByLabelText } = render(<ModalDialog showDialog={true} />);

      expect(getByLabelText("Modal cancel button").textContent).toContain(
        "Cancel"
      );
    });

    it("icon", () => {
      const { getByLabelText } = render(<ModalDialog showDialog={true} />);

      expect(getByLabelText("Modal icon").classList).toContain(
        "fa-exclamation-triangle"
      );
    });
  });

  describe("uses props: ", () => {
    it("prompt", () => {
      const { getByLabelText } = render(
        <ModalDialog showDialog={true} prompt="test modal prompt" />
      );

      expect(getByLabelText("Modal prompt").textContent.trim()).toBe(
        "test modal prompt"
      );
    });

    it("header", () => {
      const { getByLabelText } = render(
        <ModalDialog showDialog={true} header="test modal header" />
      );

      expect(getByLabelText("Modal header").children[0].textContent).toBe(
        "test modal header"
      );
    });

    it("confirm button text", () => {
      const { getByLabelText } = render(
        <ModalDialog
          showDialog={true}
          confirmPrompt="test modal confirm prompt"
        />
      );

      expect(getByLabelText("Modal confirm button").textContent.trim()).toBe(
        "test modal confirm prompt"
      );
    });

    it("cancel button text", () => {
      const { getByLabelText } = render(
        <ModalDialog
          showDialog={true}
          cancelPrompt="test modal cancel prompt"
        />
      );

      expect(getByLabelText("Modal cancel button").textContent.trim()).toBe(
        "test modal cancel prompt"
      );
    });

    it("error icon", () => {
      const { getByLabelText } = render(
        <ModalDialog showDialog={true} iconStyle="Error" />
      );

      expect(getByLabelText("Modal icon").classList).toContain("fa-times");
    });

    it("info icon", () => {
      const { getByLabelText } = render(
        <ModalDialog showDialog={true} iconStyle="Info" />
      );

      expect(getByLabelText("Modal icon").classList).toContain(
        "fa-info-circle"
      );
    });

    it("autoFocus not set", () => {
      const { getByLabelText } = render(
        <ModalDialog
          showDialog={true}
          iconStyle="Info"
          confirmPrompt="Yes"
          cancelPrompt="No"
        />
      );

      expect(getByLabelText("Modal confirm button")).not.toBe(
        document.activeElement
      );
      expect(getByLabelText("Modal cancel button")).not.toBe(
        document.activeElement
      );
    });

    it("autoFocus set to confirm button", () => {
      const { getByLabelText } = render(
        <ModalDialog
          showDialog={true}
          iconStyle="Info"
          confirmPrompt="Yes"
          cancelPrompt="No"
          autoFocus="Yes"
        />
      );

      expect(getByLabelText("Modal confirm button")).toBe(
        document.activeElement
      );
      expect(getByLabelText("Modal cancel button")).not.toBe(
        document.activeElement
      );
    });

    it("autoFocus set to cancel button", () => {
      const { getByLabelText } = render(
        <ModalDialog
          showDialog={true}
          iconStyle="Info"
          confirmPrompt="Yes"
          cancelPrompt="No"
          autoFocus="No"
        />
      );

      expect(getByLabelText("Modal confirm button")).not.toBe(
        document.activeElement
      );
      expect(getByLabelText("Modal cancel button")).toBe(
        document.activeElement
      );
    });

    describe("events", () => {
      describe("result reporting", () => {
        describe("confirm click", () => {
          it("calls callback with default prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByLabelText } = render(
              <ModalDialog
                showDialog={true}
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByLabelText("Modal confirm button"));

            expect(mockResultCallback).toBeCalledWith("Confirm");
          });

          it("calls callback with custom prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByLabelText } = render(
              <ModalDialog
                showDialog={true}
                confirmPrompt="Custom confirm propmpt"
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByLabelText("Modal confirm button"));

            expect(mockResultCallback).toBeCalledWith("Custom confirm propmpt");
          });
        });

        describe("cancel click", () => {
          it("calls callback with default prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByLabelText } = render(
              <ModalDialog
                showDialog={true}
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByLabelText("Modal cancel button"));

            expect(mockResultCallback).toBeCalledWith("Cancel");
          });

          it("calls callback with custom prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByLabelText } = render(
              <ModalDialog
                showDialog={true}
                cancelPrompt="Custom cancel prompt"
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByLabelText("Modal cancel button"));

            expect(mockResultCallback).toBeCalledWith("Custom cancel prompt");
          });
        });

        describe("close click", () => {
          it("calls callback with default prompt", () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByLabelText } = render(
              <ModalDialog
                showDialog={true}
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByLabelText("Modal header").children[1]);

            expect(mockResultCallback).toBeCalledWith("Cancel");
          });

          it("calls callback with custom prompt", async () => {
            var mockResultCallback = jest.fn(r => r);
            const { getByLabelText } = render(
              <ModalDialog
                showDialog={true}
                cancelPrompt="Custom cancel prompt"
                reportResult={mockResultCallback}
              />
            );

            fireEvent.click(getByLabelText("Modal header").children[1]);

            expect(mockResultCallback).toBeCalledWith("Custom cancel prompt");
          });
        });
      });
    });
  });
});
