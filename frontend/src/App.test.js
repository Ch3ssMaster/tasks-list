import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// validar la interfaz de usuario

// antes de cualquier prueba, crear al menos una tarea
beforeAll(() => {
  render(<App />);
  const input = screen.getByRole("textbox");
  userEvent.type(input, "Test task");
  const button = screen.getByRole("button");
  userEvent.click(button);
});

describe("App", () => {
  // verificar que el componente App se renderice
  it("renders App component", () => {
    render(<App />);
  });
  // verificar que el texto "Post a Task" se muestre en la interfaz
  it('App contains "Post a Task" title', () => {
    render(<App />);
    expect(screen.getByText("Post a Task")).toBeInTheDocument();
  });
  // verificar que hay un input de tipo texto
  it("App contains a text input", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  // verificar que hay un botón, y con el texto "save"
  it("App contains a save button", () => {
    render(<App />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Save");
  });
  // verificar de forma asíncrona que hay elementos de lista
  it("App contains a list of tasks'", async () => {
    render(<App />);
    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
  });
  /* verificar que el primer elemento de la lista tiene un div con el atributo contenteditable="true"
  y que dentro del div hay un string*/
  it("App contains a list of tasks with a contenteditable div", async () => {
    render(<App />);
    const list = await screen.findByRole("list");
    expect(list.firstChild.firstChild).toHaveAttribute(
      "contenteditable",
      "true"
    );
    expect(list.firstChild.firstChild).toHaveTextContent(/.+/);
  });
  /* verificar que hay un elemento span con la clase done , 
  otro con la clase edit , 
  y otro con la clase delete  */
  it("App contains a list of tasks with done, edit and delete buttons", async () => {
    render(<App />);
    const list = await screen.findByRole("list");
    expect(list.firstChild.firstChild.nextSibling).toHaveClass("done", {
      exact: false,
    });
    expect(list.firstChild.firstChild.nextSibling.nextSibling).toHaveClass(
      "edit",
      { exact: false }
    );
    expect(
      list.firstChild.firstChild.nextSibling.nextSibling.nextSibling
    ).toHaveClass("delete", { exact: false });
  });

  /* Hacer click en el botón de editar del primer elemento de la lista.
  Verificar que el div con el atributo contenteditable="true" ahora tiene el foco.
  Verificar que el botón de editar ahora tiene la clase edit-mode .
   */
  it("App contains a list of tasks with a contenteditable div with focus", async () => {
    render(<App />);
    const list = await screen.findByRole("list");
    const editButton = list.firstChild.firstChild.nextSibling.nextSibling;
    userEvent.click(editButton);
    expect(list.firstChild.firstChild).toHaveFocus();
    expect(list.firstChild.firstChild).toHaveClass("edit-mode", {
      exact: false,
    });
  });
  /* Hacer click en el botón de editar del primer elemento de la lista.
  Cambiar el texto del div con el atributo contenteditable="true" por "New Task".
  Pulsar la tecla Enter para guardar el texto.
  Verificar que el texto del div con el atributo contenteditable="true" es "New Task".
  Verificar que el botón de editar ahora no tiene la clase edit-mode .
    */
  it("Change, save and verify the new text into the first task", async () => {
    render(<App />);
    let list = await screen.findByRole("list");
    const editButton = list.firstChild.firstChild.nextSibling.nextSibling;
    userEvent.click(editButton);
    // el usuario borra el texto y escribe "New Task"
    userEvent.keyboard("{del}");
    userEvent.type(list.firstChild.firstChild, "New Task");
    userEvent.keyboard("{enter}");
    // recargar la lista actualizada
    list = await screen.findByRole("list");
    expect(list.firstChild.firstChild).toHaveTextContent("New Task");
    expect(list.firstChild.firstChild).not.toHaveClass("edit-mode", {
      exact: false,
    });
  });
  /* Hacer click en el botón para marcar la primera tarea como realizada.
  Verificar que el primer elemento de la lista tiene la clase isDone. 
    */
  it("Mark the first task as done", async () => {
    render(<App />);
    let list = await screen.findByRole("list");
    const doneButton = list.firstChild.firstChild.nextSibling;
    userEvent.click(doneButton);
    list = await screen.findByRole("list");
    // comprobar que el primer elemento de la lista tiene la clase isDone
    expect(list.firstChild.firstChild).toHaveClass("isDone", { exact: false });
  });
  /*  Pulsar de nuevo el botón para marcar la primera tarea como no realizada.
  Verificar que el primer elemento de la lista no tiene la clase isDone.
    */
  it("Mark the first task as undone", async () => {
    render(<App />);
    let list = await screen.findByRole("list");
    const doneButton = list.firstChild.firstChild.nextSibling;
    userEvent.click(doneButton);
    list = await screen.findByRole("list");
    expect(list.firstChild.firstChild).not.toHaveClass("isDone", {
      exact: false,
    });
  });
  /* Hacer click en el botón para eliminar la primera tarea.
  Verificar que el primer elemento de la lista no existe.
  En su lugar, debe aparecer un párrafo con el texto "No pending tasks!".
    */
  it("Delete all tasks and verify that the list is empty", async () => {
    render(<App />);
    let list = await screen.findByRole("list");
    // obtener el número de elementos de la lista y eliminarlos uno a uno
    let numberOfTasks = list.children.length;
    while (numberOfTasks > 0) {
      list = await screen.findByRole("list");
      numberOfTasks = list.children.length;
      let deleteButton =
      list.firstChild.firstChild.nextSibling.nextSibling.nextSibling;
      userEvent.click(deleteButton);
      if (numberOfTasks === 1) {
        break;
      }
    }
    // encontrar un párrafo con el texto "No pending tasks!"
    let paragraph = await screen.findByText("No pending tasks!");
    expect(paragraph).toBeInTheDocument();
  });
});
