import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  return (
    <ul>
      {props.days &&
        props.days.map((day, i) => (
          <DayListItem
            key={i}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={() => {
              props.setDay(day.name);
            }}
          />
        ))}
    </ul>
  );
}
