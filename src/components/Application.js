import React, { useState } from "react";

import "components/Application.scss";

import DayList from "./DayList";

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

export default function Application(props) {
  let [day, setDay] = useState("Monday");

  return (
    <main className="layout">
      <nav>
        {/* KEVIN: compass asked to put DayList in nav, but it didn't exist */}
        {/* it ACTUALLY belongs in the sidebar below */}
      </nav>
      <section className="sidebar">
        <DayList
          days={days}
          day={day}
          setDay={setDay}
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
