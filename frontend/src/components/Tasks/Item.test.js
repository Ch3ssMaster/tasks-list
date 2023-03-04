import { render, screen } from "@testing-library/react";
import Item from "./Item";

// verificar que el componente Item se renderice
describe("Item", () => {
  it("renders Item component", () => {
    render(<Item />);
  });
  // comprobar que hay un li con la clase task-item
  it("Item contains a li with the class task-item", () => {
    render(<Item />);
    expect(screen.getByRole("listitem")).toHaveClass("task-item");
  });
  // comprobar que hay un div con la clase title
  it("Item contains a div with the class title", () => {
    render(<Item />);
    let item = screen.getByRole("listitem");
    expect(item.firstChild).toHaveClass("title");
  });
  // comprobar que hay un botón con la clase delete
  it("Item contains a button with the text 'Delete'", () => {
    render(<Item />);
    let item = screen.getByRole("listitem");
    expect(item.lastChild).toHaveClass("delete", { exact: false });
  });
  // comprobar que hay un botón con la clase edit
  it("Item contains a button with the text 'Edit'", () => {
    render(<Item />);
    let item = screen.getByRole("listitem");
    expect(item.lastChild.previousSibling).toHaveClass("edit", {
      exact: false,
    });
  });
  // comprobar que hay un botón con la clase done
  it("Item contains a button with the text 'Done'", () => {
    render(<Item />);
    let item = screen.getByRole("listitem");
    expect(item.firstChild.nextSibling).toHaveClass("done", { exact: false });
  });
});
