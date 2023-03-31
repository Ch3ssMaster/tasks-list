import { render, screen } from "@testing-library/react";
import SubmitButton from "./SubmitButton";

// verificar que el componente SubmitButton se renderice
describe("SubmitButton", () => {
  it("renders SubmitButton component", () => {
    render(<SubmitButton type="submit">Save</SubmitButton>);
  });
  // comprobar que hay un botón con el texto "Save"
  it("SubmitButton contains a button with the text 'Save'", () => {
    render(<SubmitButton type="submit">Save</SubmitButton>);
    expect(screen.getByRole("button")).toHaveTextContent("Save");
  });
  // comprobar que el botón está deshabilitado
  it("SubmitButton is disabled", () => {
    render(
      <SubmitButton type="submit" disabled>
        Save
      </SubmitButton>
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });
  // comprobar que recibe por props el texto Submit
  it("SubmitButton receives the text Submit", () => {
    render(<SubmitButton type="submit">Submit</SubmitButton>);
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });
});
