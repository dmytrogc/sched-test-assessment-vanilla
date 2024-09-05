import sessions from "./data/session.json";
import roles from "./data/role.json";
import users from "./data/user.json";
import groupSessionsByDayAndSlots from "./utils/groupSessionsByDayAndSlots";
import sortSessions from "./utils/sortSessions";
import Session from "./session";

class Schedule {
  constructor() {
    this.scheduleData = this.processScheduleData();
  }

  processScheduleData() {
    // Filter inactive sessions
    const activeSessions = sessions.filter((session) => session.active === "Y");
    const sortedSessions = sortSessions(activeSessions);

    const usersMap = users.reduce((accum, user) => {
      accum[user.id] = user;
      return accum;
    }, {});

    const rolesMap = roles.reduce((accum, role) => {
      const userData = usersMap[role.userid];
      if (!userData) return accum;

      const data = [{ ...role, ...userData }];
      accum[role.sessionid] = accum[role.sessionid]
        ? [...accum[role.sessionid], ...data]
        : data;

      return accum;
    }, {});

    const sessionsWithRoles = sortedSessions.map((session) => ({
      ...session,
      roles: rolesMap[session.id] ?? [],
    }));

    return groupSessionsByDayAndSlots(sessionsWithRoles);
  }

  // Renders the schedule
  renderSchedule() {
    const wrapper = document.querySelector("#root");
    const session = new Session();

    this.scheduleData.forEach((daySchedule) => {
      const { day } = daySchedule;

      const dayContainer = document.createElement("div");
      dayContainer.className = "schedule-day-container";

      const dayHeader = document.createElement("h2");
      dayHeader.className = "schedule-day-header";
      dayHeader.textContent = day;
      dayContainer.appendChild(dayHeader);

      daySchedule.slots.forEach((sessions) => {
        session.renderSessions(sessions, dayContainer);
      });

      wrapper.appendChild(dayContainer);
    });
  }
}

export default Schedule;
