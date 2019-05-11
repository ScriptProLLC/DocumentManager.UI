import { formatDate } from "./dates";

it("should format an ISO 8601 date in MM/DD/YYYY hh:mm a format", () => {
  expect(formatDate("1997-01-01T06:30:16.25")).toEqual("01/01/1997 6:30 AM");
});

it("should format PM hours in standard time", () => {
  expect(formatDate("1997-01-01T14:30:16.25")).toEqual("01/01/1997 2:30 PM");
});
