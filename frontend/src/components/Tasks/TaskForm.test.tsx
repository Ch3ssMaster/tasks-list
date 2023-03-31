import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import TasksForm from "./TasksForm";

// verificar que el componente TasksForm se renderice
describe("TasksForm", () => {
  it("renders TasksForm component", () => {
    render(<TasksForm onAddTask={function (task: { title: string; done: boolean; }): void {
      throw new Error("Function not implemented.");
    } } />);
  });
  // comprobar que hay un input
  it("TasksForm contains an input", () => {
    render(<TasksForm onAddTask={function (task: { title: string; done: boolean; }): void {
      throw new Error("Function not implemented.");
    } } />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  // comprobar que el input recibe el foco al pulsar el boton, si está vacío
  it("TasksForm input receives focus when clicking the button if it is empty", () => {
    render(<TasksForm onAddTask={function (task: { title: string; done: boolean; }): void {
      throw new Error("Function not implemented.");
    } } />);
    userEvents.click(screen.getByRole("button"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
  // comprobar que hay un botón
  it("TasksForm contains a button", () => {
    render(<TasksForm onAddTask={function (task: { title: string; done: boolean; }): void {
      throw new Error("Function not implemented.");
    } } />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
