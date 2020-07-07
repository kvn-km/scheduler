import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let className = classNames("interviewers__item", {
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected
  });
  return (
    <li className={className} onClick={props.setInterviewer}>
      <img
        className={className}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}