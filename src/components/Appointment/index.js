import React from "react";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Saving from "./Saving";
import Deleting from "./Deleting";
import Confirm from "./Confirm";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    // timeout not needed
    // kev's own input to see the SAVE mode
    const timeOut = Math.random() * 1500;
    setTimeout(() => {
      props.bookInterview(props.id, interview);
      transition(SHOW);
    }, timeOut);
  };

  const deleting = (id) => {
    transition(DELETING);
    const timeOut = Math.random() * 1500;
    setTimeout(() => {
      props.cancelInterview(props.id);
      transition(EMPTY);
    }, timeOut);
  };

  const deleteConfirmation = () => {
    transition(CONFIRM);
  };

  const edit = (x) => {
    transition(EDIT);
    // const props = { name: props.interview.student, interviewer: props.interview.interviewer };

  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => deleteConfirmation}
          onEdit={() => edit} />}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save} />}
      {mode === SAVING &&
        <Saving />}
      {mode === DELETING &&
        <Deleting />}
      {mode === CONFIRM &&
        <Confirm onCancel={back} onConfirm={deleting} />}
      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />}
    </article>
  );
}