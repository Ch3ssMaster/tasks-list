import Fetch from "./Fetch";

describe("Fetch", () => {
  // verificar que el método get devuelva un array
  it("get method returns an array", async () => {
    const response = await Fetch.get();
    expect(response.data).toBeInstanceOf(Array);
  });
  // verificar que el método post devuelva un objeto
  it("post method returns an object", async () => {
    const response = await Fetch.post({ title: "test" });
    expect(response.data).toBeInstanceOf(Object);
  });
  // verificar que el método update devuelva un objeto
  it("update method returns an object", async () => {
    // obtener el id de la primera tarea
    const { data } = await Fetch.get();
    const id = data[0]._id;
    // actualizar la tarea
    const response = await Fetch.update(
      { title: "Updated Task", done: true },
      id
    );
    expect(response.data).toBeInstanceOf(Object);
  });
  // verificar que el método delete devuelva un objeto,
  // con la propiedad status igual a "succeeded"
  it("delete method returns an object with status succeeded", async () => {
    // obtener el id de la primera tarea
    const { data } = await Fetch.get();
    const id = data[0]._id;
    // eliminar la tarea
    const response = await Fetch.delete(id);
    expect(response.status).toBe("succeeded");
  });
});
