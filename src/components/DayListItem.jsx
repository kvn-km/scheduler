import React from "react";
import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (spots) => {
    let p = "s";
    let n = spots;
    if (spots === 1) {
      p = "";
    }
    if (spots === 0) {
      n = "no";
    }
    return `${n} spot${p} remaining`;
  };

  return (
    <li data-testid="day" className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
