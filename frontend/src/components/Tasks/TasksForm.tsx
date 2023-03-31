import { useState, useRef } from "react";

import SubmitButton from "../UI/Button/SubmitButton";
import classes from "./TasksForm.module.css";

/**
 *
 * @param props {onAddTask: (task: {title: string, done: boolean}) => void}
 * @returns JSX.Element
 */

type TasksFormProps = {
  onAddTask: (task: { title: string; done: boolean }) => void;
};

const TasksForm = (props: TasksFormProps): JSX.Element => {
  const [enteredValue, setEnteredValue] = useState("");
  const [fullfilled, setIsFullfilled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputChangeHandler = (event: React.ChangeEvent) => {
    if ((event.target as HTMLInputElement).value.trim().length > 0) {
      setIsFullfilled(true);
    }
    setEnteredValue((event.target as HTMLInputElement).value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsFullfilled(false);
      if (inputRef.current !== null) {
        inputRef?.current?.focus();
      }
      return;
    }
    props.onAddTask({ title: enteredValue, done: false });
    setEnteredValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div
        className={`${classes["form-control"]} ${
          !fullfilled && classes["not-fullfilled"]
        }`}
      >
        <label>
          <h2>Post a Task</h2>
        </label>
        <input
          ref={inputRef}
          type="text"
          onChange={inputChangeHandler}
          value={enteredValue}
        />
      </div>
      <SubmitButton type="submit">Save</SubmitButton>
    </form>
  );
};

export default TasksForm;
