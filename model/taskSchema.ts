import mongoose, { Schema } from "mongoose";

export interface ITasks {
  title: string;
  description?: string;
  completed: boolean;
  dueDate: Date;
}

const TasksSchema = new Schema<ITasks>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TasksSchema.pre("save", function (next) {
  if (this.dueDate < new Date()) {
    const error = new Error("Due date must be after created date!");
    next(error);
  } else {
    next();
  }
});

const Tasks = mongoose.model("Tasks", TasksSchema);

export default Tasks;
