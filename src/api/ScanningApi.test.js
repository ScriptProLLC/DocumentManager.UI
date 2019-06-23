import { cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import { scan } from "./ScanningApi";
import axios from "axios";

jest.mock("axios");

describe("Scanning API", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe("scan", () => {
    it("calls axios", async () => {
      const spy = jest.spyOn(axios, "get");

      await scan();

      //expect(spy).toBeCalled();
    });

    it("uses the correct url", async () => {
      const spy = jest.spyOn(axios, "get");

      await scan();

      //expect(spy).toBeCalledWith(`whatever the scanning url ends up being`);
    });
  });
});
