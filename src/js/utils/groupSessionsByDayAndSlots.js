import { DAYS_OF_WEEK, MONTHS } from "../constants";
import formatTime from "./formatTime";

const formatDate = (date) => {
  const dateObj = new Date(date);
  const dayName = DAYS_OF_WEEK[dateObj.getUTCDay()];
  const monthName = MONTHS[dateObj.getUTCMonth()];
  const day = dateObj.getUTCDate();

  return `${dayName}, ${monthName} ${day}`;
};

const groupSessionsByDayAndSlots = (sessions) => {
  const sessionsByDay = new Map();

  sessions.forEach((session) => {
    const day = formatDate(session.session_start);

    if (!sessionsByDay.has(day)) {
      sessionsByDay.set(day, new Map());
    }

    const daySessions = sessionsByDay.get(day);

    // Round the session start time to the nearest 15-minute slot
    const sessionStart = new Date(session.session_start);
    const slotTime = new Date(sessionStart);
    slotTime.setMinutes(Math.floor(slotTime.getMinutes() / 15) * 15, 0, 0);

    const slotKey = formatTime(slotTime);

    if (!daySessions.has(slotKey)) {
      daySessions.set(slotKey, []);
    }

    daySessions.get(slotKey).push(session);
  });

  // Convert the day sessions and slots into the 2D array format
  return Array.from(sessionsByDay.entries()).map(([day, slotsMap]) => ({
    day,
    slots: Array.from(slotsMap.values()),
  }));
};

export default groupSessionsByDayAndSlots;
