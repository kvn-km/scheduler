
export function getAppointmentsForDay(state, day) {

  let theState = {};
  for (let days of state.days) {
    if (days.name === day) {
      theState = days.appointments;
    }
  }

  let daysAppointments = [];
  if (theState.length > 0) {
    for (let appointment of theState) {
      daysAppointments.push(state.appointments[appointment]);
    }
  }
  return daysAppointments;
}

export function getInterview(state, interview) {

  let theInterview = {};

  if (interview === null) {
    return null;
  }
  const interviewerId = interview.interviewer;

  theInterview = {
    ...interview,
    interviewer: state.interviewers[interviewerId]
  };

  return theInterview;

}