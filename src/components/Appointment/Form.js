import React, { useState } from "react";
// import classNames from "classnames";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {

  let [name, setName] = useState(props.name || "");
  let [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    props.onSave(name, interviewer);
    setError("");
  };


  const resetForm = () => {
    setName('');
    setInterviewer(null);
  };

  const cancel = () => {
    resetForm();
    props.onCancel();
  };

  const save = () => {
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component: below
            */
            // value={name}
            value={name}
            onChange={(event) => setName(event.target.value)}
          /*
            This must be a controlled component: above
          */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={(event) => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}