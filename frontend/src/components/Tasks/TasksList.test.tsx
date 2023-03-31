import { render, screen } from "@testing-library/react";
import TasksList from "./TasksList";

type TaskList = {
  _id: string;
  title: string;
  done: boolean;
}
let tasks = [{ _id: "", title: "", done: false } as TaskList];
let deleteItemHandler = function (id: string): void {
  console.log(id);
};
let updateItemHandler = function (task: { title: string; done: boolean; }, id: string): void {
  console.log(task, id);
};
// antes de cada test se ejecuta esta función
beforeEach(() => {
  // mock de las tareas
  tasks = [
    {
      _id: "60f1f9b0b9b5a40015b1b1b1",
      title: "Tarea 1",
      done: false,
    },
    {
      _id: "60f1f9b0b9b5a40015b1b1b2",
      title: "Tarea 2",
      done: false,
    },
  ];

  // mock de las funciones
  deleteItemHandler = jest.fn();
  updateItemHandler = jest.fn();
});

// verificar que el componente TaskList se renderice
describe("TaskList", () => {
  it("renders TaskList component", () => {
    render(
      <TasksList
        items={tasks}
        onDeleteItem={deleteItemHandler}
        onUpdateItem={updateItemHandler}
      />
    );
  });
  // comprobar que hay una lista y que su cantidad es mayor a 0
  it("TaskList contains a list", () => {
    render(
      <TasksList
        items={tasks}
        onDeleteItem={deleteItemHandler}
        onUpdateItem={updateItemHandler}
      />
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });
  // comprobar que hay una lista y que su cantidad es igual a 0
  it("TaskList contains a list", () => {
    render(
      <TasksList
        items={[]}
        onDeleteItem={deleteItemHandler}
        onUpdateItem={updateItemHandler}
      />
    );
    let list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(0);
  });
});
