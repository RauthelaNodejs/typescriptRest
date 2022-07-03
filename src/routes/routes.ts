import express from "express";
import task from '../controller/contoller';

const taskRouter = express.Router();

taskRouter.post("/create-task",task.createTask);
taskRouter.get("/get-tasks",task.getAllTask);
taskRouter.get("/get-task-byId",task.getTask);
taskRouter.put("/edit-task",task.editTask);
taskRouter.delete("/delete-task",task.removeTask);







export default {taskRouter}