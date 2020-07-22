import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments"), axios.get("/api/interviewers")])
      .then((all) => {
        setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const remainingSpots = (day, appointments) => {
    let appointmentArr = day.appointments;
    let available = 0;
    for (const id of appointmentArr) {
      if (appointments[id].interview === null) {
        available++;
      }
    }
    return available;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = state.days.map((day) => ({ ...day, spots: remainingSpots(day, appointments) }));
    return Promise.resolve(axios.put(`/api/appointments/${id}`, { interview })).then(() =>
      setState({ ...state, appointments, days })
    );
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = state.days.map((day) => ({ ...day, spots: remainingSpots(day, appointments) }));
    return Promise.resolve(axios.delete(`/api/appointments/${id}`)).then(() => setState({ ...state, appointments, days }));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
