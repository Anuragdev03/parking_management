import { format, getTime as formatTime } from "date-fns";
/**
 * function to format time data
 *
 * @param timeStamp
 */
class DateTime {
  static getDateTime(timeStamp: number) {
    try {
      let formatedDate = format(new Date(timeStamp), "yyyy-MM-dd hh:mm:ss");

      return formatedDate;
    } catch (err) {
      return "Error fetching date";
    }
  }

  static time(timeStamp: number | Date) {
    try {
      let formatedTime = format(new Date(timeStamp), "HH:mm:ss");

      return formatedTime;
    } catch (err) {
      return "Error fetching time";
    }
  }

  static getTime(dateTime: Date) {
    try {
      let formatedTime = formatTime(dateTime);
      let time = this.time(formatedTime);

      return time;
    } catch (err) {
      return "Error in formating tiem";
    }
  }

  static timediff(start, end) {
    try {
      start = start.split(":");
      end = end.split(":");
      let startDate = new Date(0, 0, 0, start[0], start[1], 0);
      let endDate = new Date(0, 0, 0, end[0], end[1], 0);
      let diff = endDate.getTime() - startDate.getTime();
      let hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      let minutes = Math.floor(diff / 1000 / 60);

      return (
        (hours < 9 ? "0" : "") +
        hours +
        ":" +
        (minutes < 9 ? "0" : "") +
        minutes
      );
    } catch (err) {
      return;
    }
  }
}

export default DateTime;
