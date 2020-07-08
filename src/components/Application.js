import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {

  // set states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // create functions to change states within the new state objects above
  // so that we dont have to change it below in the DayList component
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8001/api/days`)
  //     // .then(res => setDays(res.data))
  //     .catch(e => console.log(e))
  //     .finally(console.log("AXIOS FETCH COMPLETE"));
  // }, []); // since setDays above uses previous states and changes it,
  // // a dependancy is not needed here

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios.get(`http://localhost:8001/api/days`)
      ),
      Promise.resolve(
        axios.get(`http://localhost:8001/api/appointments`)
      ),
      Promise.resolve(
        axios.get(`http://localhost:8001/api/interviewers`)
      )
    ])
      .then((all) => {
        setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <nav>
        {/* KEVIN: compass asked to put DayList in nav, but it didn't exist */}
        {/* it ACTUALLY belongs in the sidebar below */}
      </nav>
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        // setDay={setState({ ...state, day: state.day })}
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {schedule}
      </section>
    </main>
  );
}