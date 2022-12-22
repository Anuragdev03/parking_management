import DateTime from "../utils/DateTime";
import { isValid, parse } from "date-fns";

describe("Testing DateTime utility function", () => {
  it("Testing the gettime function", () => {
    let time = DateTime.getTime(new Date());
    let timeArr = time.split(":");
    if (timeArr.length === 3) {
      expect(timeArr).toBeTruthy();
    } else {
      throw new Error("Test Failed");
    }
  });

  it("Testing getDateTime", () => {
    let tiemStamp = 1671682704;
    let date = DateTime.getDateTime(tiemStamp);

    let validDate = parse(date, "yyyy-MM-dd hh:mm:ss", new Date());
    expect(isValid(validDate)).toBe(true);
  });

  it("Testing time difference", () => {
    let start = "10:30", end = "12:30";
    let timeDiff = DateTime.timediff(start, end);
    expect(timeDiff).toBe("02:00")
  })
});
