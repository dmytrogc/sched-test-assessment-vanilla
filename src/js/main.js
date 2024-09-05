import Schedule from "./schedule";

// Initialize and load the schedule
const loadApp = () => {
  const schedule = new Schedule();
  schedule.renderSchedule();
};

loadApp();
