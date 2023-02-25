const { faker } = require("@faker-js/faker");

// obtener la base de datos y la colección desde la línea de comandos
const [db, collection] = process.argv.slice(2);

// función que genera 10 tareas, con los campos title (lorem ipsum),
// y un campo booleano, que indica si la tarea está completada o no

const generateTasks = () => {
  const tasks = [];
  for (let i = 0; i < 10; i++) {
    tasks.push({
      title: faker.lorem.words(),
      done: faker.datatype.boolean(),
    });
  }
  return tasks;
};

// Exportarlos a archivo y confirmar que se ha generado correctamente
try {
  const fs = require("fs");
  // crear carpeta output si no existe
  if (!fs.existsSync("./scripts/output")) {
    fs.mkdirSync("./scripts/output");
  }
 
  // preparar el archivo para insertar los datos desde el plugin de vscode para mongodb
  fs.writeFileSync("./scripts/output/tasks.mongodb", `use('${db}')\n`);
  fs.appendFileSync(
    "./scripts/output/tasks.mongodb",
    `db.${collection}.insertMany(\n`
  );
  fs.appendFileSync(
    "./scripts/output/tasks.mongodb",
    `\t${JSON.stringify(generateTasks())}\n`
  );
  fs.appendFileSync("./scripts/output/tasks.mongodb", ")");
  console.log("tasks.mongodb generated successfully");
} catch (error) {
  console.log(error);
}
