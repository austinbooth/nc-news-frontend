import { formatDate } from "../utils";

describe("formatDate", () => {
  it("returns a correctly formatted date when passed a date object for a date in the past", () => {
    const input = new Date("August 3 2010 13:42:50");
    expect(formatDate(input)).toBe("3 August 2010");
  });
  it("returns a correctly formatted date when passed a date object for a future date", () => {
    const input = new Date("December 15 2196 22:39:00");
    expect(formatDate(input)).toBe("15 December 2196");
  });
});
