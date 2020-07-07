import React from "react";
// import classNames from "classnames";

import "./styles.scss";

export default function Appointment(props) {
  return (
    <article className="appointment">
      Hello{props.time && `. The time is ${props.time}`}.
    </article>
  );
}