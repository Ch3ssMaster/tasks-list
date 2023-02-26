import { useState } from "react";
// importar la clase Fetch
import Fetch from "../utils/Fetch";

const useFetch = () => {
  const [tasks, setNewTask] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasksHandler = async (
    method = "GET",
    body = { text: "", done: false },
    id = ""
  ) => {
    try {
      setPending(true);
      setError(null);
      let data = null;
      // switch para manejar los diferentes métodos
      switch (method) {
        case "GET":
          data = await Fetch.get();
          break;
        case "POST":
          data = await Fetch.post(body);
          break;
        case "PATCH":
          data = await Fetch.update(body, id);
          break;
        case "DELETE":
          data = await Fetch.delete(id);
          break;
      }

      /* si el método es GET, se actualiza la lista de tareas
      si no, se vuelve a hacer una petición GET para actualizar la lista */
      if (method === "GET") {
        setNewTask(data);
      } else {
        fetchTasksHandler();
      }
    } catch (error) {
      setError({
        message: error.message || "Something went wrong!",
      });
    }
    setPending(false);
  };

  return { pending, error, tasks, fetchTasksHandler };
};

export default useFetch;
