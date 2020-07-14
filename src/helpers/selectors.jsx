export function getAppointmentsForDay(state, day) {
  let appointmentIds = [];
  for (let days of state.days) {
    if (days.name === day) {
      appointmentIds = days.appointments;
    }
  }
  let daysAppointments = [];
  for (let id of appointmentIds) {
    daysAppointments.push(state.appointments[id]);
  }
  return daysAppointments;
}

export function getInterview(state, interview) {
  let theInterview = {};
  if (interview === null) {
    return null;
  }
  theInterview = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
  return theInterview;
}

export function getInterviewersForDay(state, day) {
  let interviewerIds = [];
  for (let days of state.days) {
    if (days.name === day) {
      interviewerIds = days.interviewers;
    }
  }
  let daysInterviewers = [];
  for (let id of interviewerIds) {
    daysInterviewers.push(state.interviewers[id]);
  }
  return daysInterviewers;
}
