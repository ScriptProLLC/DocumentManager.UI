import React from "react";
import { render, cleanup, fireEvent, getByText } from "react-testing-library";
import ModalDialog from "./ModalDialog";
import "jest-dom/extend-expect";

describe("Modal Dialog", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders", () => {
    const { getByLabelText } = render(<ModalDialog showDialog={true} />);

    expect(getByLabelText("Modal"));
  });

  describe("default attributes", () => {
    it("header", () => {
      const { getByLabelText } = render(<ModalDialog showDialog={true} />);
      const container = getByLabelText("Modal header");

      expect(getByText(container, "Alert"));
    });

    it("confirm button text", () => {
      const { getByText } = render(<ModalDialog showDialog={true} />);

      expect(getByText("Confirm"));
    });

    it("cancel button text", () => {
      const { getByText } = render(<ModalDialog showDialog={true} />);

      expect(getByText("Cancel"));
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
      const { getByText } = render(
        <ModalDialog showDialog={true} prompt="test modal prompt" />
      );

      expect(getByText("test modal prompt"));
    });

    it("header", () => {
      const { getByText } = render(
        <ModalDialog showDialog={true} header="test modal header" />
      );

      expect(getByText("test modal header"));
    });

    it("confirm button text", () => {
      const { getByText } = render(
        <ModalDialog
          showDialog={true}
          confirmPrompt="test modal confirm prompt"
        />
      );

      expect(getByText("test modal confirm prompt"));
    });

    it("cancel button text", () => {
      const { getByText } = render(
        <ModalDialog
          showDialog={true}
          cancelPrompt="test modal cancel prompt"
        />
      );

      expect(getByText("test modal cancel prompt"));
    });

    it("cancel prompt null", () => {
      const { queryByLabelText } = render(
        <ModalDialog showDialog={true} cancelPrompt={null} />
      );

      expect(queryByLabelText("Modal cancel prompt")).toBeNull();
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
      describe("confirm click", () => {
        it("calls callback with default prompt", () => {
          const mockResultCallback = jest.fn(r => r);
          const { getByLabelText } = render(
            <ModalDialog showDialog={true} reportResult={mockResultCallback} />
          );

          fireEvent.click(getByLabelText("Modal confirm button"));

          expect(mockResultCallback).toBeCalledWith("Confirm");
        });

        it("calls callback with custom prompt", () => {
          const mockResultCallback = jest.fn(r => r);
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
          const mockResultCallback = jest.fn(r => r);
          const { getByLabelText } = render(
            <ModalDialog showDialog={true} reportResult={mockResultCallback} />
          );

          fireEvent.click(getByLabelText("Modal cancel button"));

          expect(mockResultCallback).toBeCalledWith("Cancel");
        });

        it("calls callback with custom prompt", () => {
          const mockResultCallback = jest.fn(r => r);
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
          const mockResultCallback = jest.fn(r => r);
          const { getByLabelText } = render(
            <ModalDialog showDialog={true} reportResult={mockResultCallback} />
          );

          fireEvent.click(getByLabelText("Close"));

          expect(mockResultCallback).toBeCalledWith("Cancel");
        });

        it("calls callback with custom prompt", async () => {
          const mockResultCallback = jest.fn(r => r);
          const { getByLabelText } = render(
            <ModalDialog
              showDialog={true}
              cancelPrompt="Custom cancel prompt"
              reportResult={mockResultCallback}
            />
          );

          fireEvent.click(getByLabelText("Close"));

          expect(mockResultCallback).toBeCalledWith("Custom cancel prompt");
        });

        it("calls callback with no cancel prompt", () => {
          const mockResultCallback = jest.fn(r => r);
          const { getByLabelText } = render(
            <ModalDialog
              showDialog={true}
              cancelPrompt={null}
              reportResult={mockResultCallback}
            />
          );

          fireEvent.click(getByLabelText("Close"));

          expect(mockResultCallback).toBeCalledWith("Confirm");
        });
      });
    });
  });
});
