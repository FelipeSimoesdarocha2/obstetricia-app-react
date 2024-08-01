import date, { TimeOfTheDay } from "./date";

describe("Date", () => {
  describe("getCurrentTimeOfTheDay", () => {
    it("should return morning", () => {
      const actualHour = new Date("December 25, 2021 00:15:30");

      const result = date.getCurrentTimeOfTheDay(actualHour.getHours());

      expect(result).toBe(TimeOfTheDay.Morning);
    });

    it("should return afternoon", () => {
      const actualHour = new Date("December 25, 2021 12:15:30");

      const result = date.getCurrentTimeOfTheDay(actualHour.getHours());

      expect(result).toBe(TimeOfTheDay.Afternoon);
    });

    it("should return night", () => {
      const actualHour = new Date("December 25, 2021 23:15:30");

      const result = date.getCurrentTimeOfTheDay(actualHour.getHours());

      expect(result).toBe(TimeOfTheDay.Night);
    });
  });

  describe("getIntervalTimeToNextTimeOfTheDayInMs", () => {
    it("should return 14400000", () => {
      const result = date.getIntervalTimeToNextTimeOfTheDayInMs(8);

      expect(result).toBe(14400000);
    });

    it("should return 21600000", () => {
      const result = date.getIntervalTimeToNextTimeOfTheDayInMs(12);

      expect(result).toBe(21600000);
    });

    it("should return 21600000", () => {
      const result = date.getIntervalTimeToNextTimeOfTheDayInMs(18);

      expect(result).toBe(21600000);
    });
  });
});
