import { cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import { getCollectionDocuments, getDocument } from "./DocManagerApi";
import axios from "axios";

jest.mock("axios");

describe("Document Manager API", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe("getCollectionDocuments", () => {
    it("calls axios", async () => {
      const spy = jest.spyOn(axios, "get");

      await getCollectionDocuments();

      expect(spy).toBeCalled();
    });

    it("uses the correct url", async () => {
      const spy = jest.spyOn(axios, "get");
      const guid = "d7a2add9-14bf-480e-9b97-96685a006431";

      await getCollectionDocuments(guid);

      expect(spy).toBeCalledWith(
        `http://localhost:13005/api/docmanager/collections/${guid}/documents`
      );
    });
  });

  describe("getDocument", () => {
    it("calls axios", async () => {
      const spy = jest.spyOn(axios, "get");

      await getDocument();

      expect(spy).toBeCalled();
    });

    it("uses the correct url", async () => {
      const spy = jest.spyOn(axios, "get");
      const guid = "d7a2add9-14bf-480e-9b97-96685a006431";

      await getDocument(guid);

      expect(spy).toBeCalledWith(
        `http://localhost:13005/api/docmanager/documents/${guid}`
      );
    });
  });
});
