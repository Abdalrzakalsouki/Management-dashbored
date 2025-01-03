import Tasks, { ITasks } from "./taskSchema";

const getTasks = async () => {
  try {
    const tasks = await Tasks.find();
    return tasks;
  } catch (error) {
    console.error(`Getting all tasks fail: ${error}`);
    throw error;
  }
};

const getTask = async (taskId: number) => {
  try {
    const task = await Tasks.findById(taskId);
    return task;
  } catch (error) {
    console.error(`Getting task by id_${taskId} fail: ${error}`);
    throw error;
  }
};

const updateTask = async (taskId: number, newTask: ITasks) => {
  try {
    await Tasks.updateOne(
      { _id: taskId },
      {
        $set: newTask,
      }
    );
  } catch (error) {
    console.error(`Updating task by id_${taskId} fail: ${error}`);
    throw error;
  }
};

const deleteTask = async (taskId: number) => {
  try {
    await Tasks.deleteOne({ _id: taskId });
  } catch (error) {
    console.error(`Deleting task by id_${taskId} fail: ${error}`);
    throw error;
  }
};

const addTask = async (newTask: ITasks) => {
  try {
    await Tasks.create(newTask);
  } catch (error) {
    console.error(`Adding new task fail: ${error}`);
    throw error;
  }
};

const addTasks = async (newTasks: ITasks[]) => {
  try {
    await Tasks.insertMany(newTasks);
  } catch (error) {
    console.error(`Adding new tasks fail: ${error}`);
    throw error;
  }
};

export { getTasks, getTask, updateTask, deleteTask, addTasks, addTask };
