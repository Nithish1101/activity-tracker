import { parseDateFromString, localizeDate } from "./date";

export default function createCalendarEvent(id, activity, user_name, timeZone) {
  const startDate = parseDateFromString(activity.start_time);
  const endDate = parseDateFromString(activity.end_time);

  return {
    id,
    title: user_name,
    start: localizeDate(startDate, timeZone),
    end: localizeDate(endDate, timeZone),
  };
}
