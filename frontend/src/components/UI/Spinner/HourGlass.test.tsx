import { render, screen } from "@testing-library/react";
import HourGlass from "./HourGlass";

// verificar que el componente HourGlass se renderice
describe("HourGlass", () => {
  it("renders HourGlass component", () => {
    render(<HourGlass />);
  });
  // comprobar que hay un div con la clase container y otro con la clase lds-hourglass
  it("HourGlass contains a div with the class container", () => {
    render(<HourGlass />);
    expect(screen.getByTitle("spinner")).toHaveClass("container");
    expect(screen.getByTitle("spinner")).toContainHTML("div");
    expect(screen.getByTitle("spinner").firstChild).toHaveClass(
      "lds-hourglass"
    );
  });
});
