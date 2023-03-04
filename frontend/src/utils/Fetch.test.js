import Fetch from "./Fetch";

describe("Fetch", () => {
  // verificar que el método get devuelve un objeto con las siguientes propiedades:
  // status, data, error
  it("get method returns an object with status, data and error properties", async () => {
    const response = await Fetch.get();
    expect(response).toHaveProperty("status");
    expect(response).toHaveProperty("data");
    expect(response).toHaveProperty("error");
  });
  // verificar que el status de la respuesta sea "succeeded" o "failed"
  it("get method returns an object with status succeeded or failed", async () => {
    const response = await Fetch.get();
    expect(response.status).toBe("succeeded" || "failed");
  });
  // verificar que la propiedad error sea un string o null
  it("get method returns an object with error property as string or null", async () => {
    const response = await Fetch.get();
    expect(
      typeof response.error === "string" || response.error === null
    ).toBeTruthy();
  });
  // verificar que el método post devuelva un objeto, con los campos id, title y done
  it("post method returns an object", async () => {
    const response = await Fetch.post({ title: "test" });
    expect(response.data).toHaveProperty("_id");
    expect(response.data).toHaveProperty("title");
    expect(response.data).toHaveProperty("done");
  });
  // verificar que el método update devuelva un objeto, con los campos id, title y done
  it("update method returns an object", async () => {
    // obtener el id de la primera tarea
    const { data } = await Fetch.get();
    const id = data[0]._id;
    // actualizar la tarea
    const response = await Fetch.update(
      { title: "Updated Task", done: true },
      id
    );
    expect(response.data).toHaveProperty("_id");
    expect(response.data).toHaveProperty("title");
    expect(response.data).toHaveProperty("done");
  });
  // comprobar que devuelve un error, en caso de no incluir el id
  it("update method returns an error if id is not provided", async () => {
    try {
      const response = await Fetch.update({
        title: "Updated Task",
        done: true,
      });
    } catch (error) {
      expect(error.message).toMatch("HTTP error! status: 400");
    }
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
  // comprobar que el método delete devuelve un error, en caso de no incluir el id
  it("delete method returns an error if id is not provided", async () => {
    try {
      const response = await Fetch.delete();
    } catch (error) {
      expect(error.message).toMatch("HTTP error! status: 400");
    }
  });
});
