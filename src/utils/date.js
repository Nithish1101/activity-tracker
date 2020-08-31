import moment from "moment";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/*
  Parses Date and Time from a string that's in the format MMM DD YYYY HH:MM A
*/

export function parseDateFromString(date) {
  const regex = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d?\d) (\d{4}) \s?(\d?\d):(\d?\d)(AM|PM)/g;
  const regexMatches = [...date.matchAll(regex)][0];
  const [
    // eslint-disable-next-line no-unused-vars
    _,
    month,
    day,
    year,
    hour,
    minute,
    median,
  ] = regexMatches;
  const militaryHour = median === "PM" ? Number(hour) + 12 : hour;
  return new Date(`${month} ${day}, ${year} ${militaryHour}:${minute}:00`);
}

/*
  Converts date of a different timezone to local machine's timezone
*/

export function localizeDate(date, timeZone) {
  const timeInAnotherZone = new Date(
    date.toLocaleString("en-us", { timeZone })
  );
  const timeDifference = date - timeInAnotherZone;
  return new Date(date.getTime() + timeDifference);
}

/*
  Returns end_time date in string format of a given activity
*/

export function getLastActive(activity, timeZone) {
  const lastActiveDate = parseDateFromString(activity.end_time);
  const localizedDate = localizeDate(lastActiveDate, timeZone);
  return `${
    MONTH_NAMES[localizedDate.getMonth()]
  } ${localizedDate.getDate()}, ${localizedDate.getFullYear()}`;
}

/*
  Checks if a given date matches today
*/

export function isToday(date) {
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return true;
  }
  return false;
}

/*
  Displays time from a date object
*/

export function displayTime(date) {
  return moment(date).format("MMM DD HH : MM A");
}
