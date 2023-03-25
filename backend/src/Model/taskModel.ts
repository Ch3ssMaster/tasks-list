import { Schema, model } from "mongoose";

// la interfaz ITask describe la forma de los documentos que se almacenarán en la base de datos
interface ITask extends Document {
  title: string;
  done: boolean;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default model<ITask>("Task", taskSchema);
