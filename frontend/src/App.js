import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import HourGlass from "./components/UI/Spinners/HourGlass";
import classes from "./App.module.css";

const App = () => {
  const { pending, error, tasks, fetchTasksHandler } = useFetch();

  const addTaskHandler = (enteredText) => {
    // TODO
  };

  const deleteItemHandler = (taskId) => {
    // TODO
  };

  const updateItemHandler = (taskId, taskText) => {
    // TODO
  };

  useEffect(() => {
    // TODO
  });

  return (
    <main>
      <section className={classes["task-form"]}>
        {/* TODO: add form component */}
      </section>
      {/* { TODO: add spinner} */}
      <section className={classes["tasks-content"]}>
        {
          //   TODO: add tasks list component
        }
        {
          // TODO: Add no tasks advice
        }
        {
          //   TODO: Add error message
        }
      </section>
    </main>
  );
};

export default App;
