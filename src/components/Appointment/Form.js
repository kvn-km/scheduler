import React, { useState } from "react";
// import classNames from "classnames";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {

  let [name, setName] = useState(props.name || "");
  let [interviewer, setInterviewer] = useState(props.interviewer || null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component: below
            */
            value={name}
            onChange={(event) => setName(event.target.value)}
          /*
            This must be a controlled component: above
          */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={(event) => setInterviewer(event)
        } />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}