import { useState, useEffect } from "react";
import axios from "axios";

export default function useVisualMode(importedStuff) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)), // http://localhost:8001
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ])
      .then((all) => {
        console.log("AXIOS GET SUCCESS!");
        setState({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
      })
      .catch(e => console.log(e))
      .finally(console.log("AXIOS GET PROCESS COMPLETE!"));
  }, []);

  const setDay = day => setState({ ...state, day });

  const remainingSpots = (arrIndex, x) => {
    let spots = state.days[arrIndex].spots;
    spots += x;
    let days = state.days;
    let aDay = {};
    aDay = days[arrIndex];
    let theDay = { ...aDay, spots };
    days[arrIndex] = theDay;
    setState({ ...state, days });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    remainingSpots(Math.ceil(id / 5) - 1, -1);
    setState({ ...state, appointments });
    return Promise.resolve(axios.put(`api/appointments/${id}`, appointments[id]));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    remainingSpots(Math.ceil(id / 5) - 1, +1);
    setState({ ...state, appointments });
    return Promise.resolve(axios.delete(`/api/appointments/${id}`))
      .catch(() => console.log("AXIOS DELETE ERROR"));
  };

  return {
    state, setDay, bookInterview, cancelInterview
  };
};