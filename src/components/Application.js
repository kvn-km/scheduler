import React, { useState } from "react";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";




const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Kevin Kim",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  },
  {
    id: 6,
    time: "5pm",
    interview: {
      student: "Joanne Fung",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];

export default function Application(props) {
  let [day, setDay] = useState("Monday");

  return (
    <main className="layout">
      <nav>
        {/* KEVIN: compass asked to put DayList in nav, but it didn't exist */}
        {/* it ACTUALLY belongs in the sidebar below */}
      </nav>
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <DayList
          days={days}
          day={day}
          setDay={setDay}
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointments.map(appoint => <Appointment
          key={appoint.id}
          {...appoint} // every item in appoint prop becomes a prop definition
        />)}
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}
