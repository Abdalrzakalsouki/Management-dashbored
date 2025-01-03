import { ITasks } from "../model/taskSchema";
import {
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  addTask,
  addTasks,
} from "../model/tasksModel";
import { Application } from "express";

export const tasksRoute = (app: Application) => {
  app
    .route("/tasks")
    .get(async (_, res) => {
      const tasks = await getTasks();
      res.status(200).json(tasks);
    })
    .put(async (req, res) => {
      const { newTasks }: { newTasks: ITasks[] } = req.body;
      if (!newTasks) {
        res.status(500).json({ message: "Missing new tasks" });
        return;
      }
      await addTasks(newTasks);
      res.status(200).json({ message: "new tasks added successfully" });
    });

  app
    .route("/task/:id")
    .get(async (req, res) => {
      const { id: taskId } = req.params;
      if (!taskId) {
        res.status(500).json({ message: "Task id is required" });
        return;
      }
      const task = await getTask(parseInt(taskId));
      res.status(200).json(task);
    })
    .delete(async (req, res) => {
      const { id: taskId } = req.params;
      if (!taskId) {
        res.status(500).json({ message: "Task id is required" });
        return;
      }
      await deleteTask(parseInt(taskId));
      res.status(200).json({ message: "task deleted successfully" });
    })
    .put(async (req, res) => {
      const { task }: { task: ITasks } = req.body;
      if (!task) {
        res.status(500).json({ message: "Tasks are required" });
        return;
      }
      await addTask(task);
      res.status(200).json({ message: "new task updated successfully" });
    })
    .post(async (req, res) => {
      const { id: taskId } = req.params;
      const { newTask }: { newTask: ITasks } = req.body;
      if (!taskId || !newTask) {
        res.status(500).json({ message: "required data are missing" });
        return;
      }
      await updateTask(parseInt(taskId), newTask);
      res.status(200).json({ message: "new task added successfully" });
    });
};
