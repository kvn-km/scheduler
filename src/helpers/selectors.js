
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

// Erica's solution
// export function getAppointmentsForDay(state, day) {
//   if (state.days.length > 0) {
//     const dayObject = state.days.find(el => el.name === day);
//     if (dayObject) {
//       const dayObjectApps = dayObject.appointments;
//       const Apps = [];
//       dayObjectApps.forEach(id => {
//         Apps.push(state.appointments[id]);
//       });
//       return Apps;
//     }
//     return [];
//   }
//   return [];
// }

export function getInterview(state, interview) {
  let theInterview = {};
  if (interview === null) {
    return null;
  }
  theInterview = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  };
  return theInterview;
}