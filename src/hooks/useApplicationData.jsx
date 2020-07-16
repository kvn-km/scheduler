import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function useVisualMode() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`)),
    ])
      .then((all) => {
        setState((previous) => ({
          ...previous,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((e) => console.log(e));
  }, []);

  const setDay = (day) => setState({ ...state, day });
  let socket = useRef(null);
  let theState = useRef({ ...state });

  useEffect(() => {
    socket.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.current.onopen = function (event) {
      socket.current.send("New Client Connected");
    };

    socket.current.onmessage = function (event) {
      const info = JSON.parse(event.data);

      if (info.type === "SET_INTERVIEW") {
        if (info.interview === null) {
          cancelInterview(info.id);
        } else {
          if (theState.current.appointments[info["id"]]["interview"] === null) {
            bookInterview(info.id, info.interview, false);
          } else {
            bookInterview(info.id, info.interview, true);
          }
        }
      }
    };

    //
    //
    //
  }, []);

  const remainingSpots = (arrIndex, x) => {
    let spots = state.days[arrIndex].spots;
    spots += x;
    let days = [...state.days];
    let aDay = {};
    aDay = days[arrIndex];
    let theDay = { ...aDay, spots };
    days[arrIndex] = theDay;
    return days;
  };

  const bookInterview = (id, interview, toEdit) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    if (toEdit) {
      setState({ ...state, appointments });
      return Promise.resolve(axios.put(`api/appointments/${id}`, appointments[id]));
    } else {
      const days = remainingSpots(Math.ceil(id / 5) - 1, -1);
      setState({ ...state, appointments, days });
      return Promise.resolve(axios.put(`api/appointments/${id}`, appointments[id]));
    }
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = remainingSpots(Math.ceil(id / 5) - 1, +1);
    setState({ ...state, appointments, days });
    return Promise.resolve(axios.delete(`/api/appointments/${id}`));
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
