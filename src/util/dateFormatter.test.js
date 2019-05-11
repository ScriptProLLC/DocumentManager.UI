import formatDate from "./formatDate";

it("should format an ISO 8601 date in MM/DD/YYYY hh:mm a format", () => {
  expect(formatDate("1997-01-01T06:30:16.25")).toEqual("01/01/1997 06:30 am");
});
