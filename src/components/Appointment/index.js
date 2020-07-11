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
import Error from "./Error";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer, res) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  const deleting = (res) => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  const deleteConfirmation = () => {
    transition(CONFIRM);
  };

  const edit = (x) => {
    transition(EDIT);
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
      {mode === ERROR_SAVE &&
        <Error message="Saving" onClose={back} />}
      {mode === ERROR_DELETE &&
        <Error message="Deleting" onClose={back} />}
    </article>
  );
}