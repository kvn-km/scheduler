import Application from "../components/Application";

export default function getAppointmentsForDay(state, day) {

  let stateOfDay = {};
  for (let days of state.days) {
    if (days.name === day) {
      stateOfDay = days.appointments;
    }
  }

  let daysAppointments = [];
  if (stateOfDay.length > 0) {
    for (let appointment of stateOfDay) {
      daysAppointments.push(state.appointments[appointment]);
    }
  }
  return daysAppointments;
}