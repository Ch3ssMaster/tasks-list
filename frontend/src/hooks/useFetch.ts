import { useState } from "react";
import Fetch from "../utils/Fetch";

/**
 *
 * @method useFetch
 * @description Hook para realizar peticiones a la API
 * @returns {Object} Devuelve un objeto con los métodos para realizar las peticiones
 */

const useFetch = (): object => {
  const [tasks, setNewTask] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState({ message: "" });

  const fetchTasksHandler = async (
    method = "GET",
    body = { title: "", done: false },
    id = ""
  ) => {
    try {
      setPending(true);
      setError({ message: "" });
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
        default:
          throw new Error("Not a valid method");
      }

      /* si el método es GET, se actualiza la lista de tareas
      si no, se vuelve a hacer una petición GET para actualizar la lista */
      if (method === "GET") {
        setNewTask(data.data);
      } else {
        fetchTasksHandler();
      }
    } catch (error: any) {
      setError({
        message: error.message || "Something went wrong!",
      });
    }
    setTimeout(() => {
      setPending(false);
    }, 500);
  };

  return { pending, error, tasks, fetchTasksHandler } as const;
};

export default useFetch;
