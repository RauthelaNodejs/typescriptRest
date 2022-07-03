import { Request, Response, NextFunction } from "express";
import Task from "../models/model";

const createTask = async (req: Request, res: Response) => {
  try {
    let name: string = req.body.taskName;
    let description: string = req.body.description;
    let createTask = new Task({ name, description });
    let result = await createTask.save();
    return res
      .status(200)
      .json({ message: "Task created sucessfully", data: result });
  } catch (error) {
    return res.status(400).json({
      message: "something went wrong",
      error: error,
    });
  }
};


const getAllTask = async (req: Request, res: Response) => {
    try {
     let result = await Task.find();
      return res
        .status(200)
        .json({ message: "Tasks fetched sucessfully", data: result });
    } catch (error) {
      return res.status(400).json({
        message: "something went wrong",
        error: error,
      });
    }
  };


  const getTask = async (req: Request, res: Response) => {
    try {
    let result = await Task.findOne({_id : req.query.taskId});
      return res
        .status(200)
        .json({ message: "Tasks fetched sucessfully", data: result });
    } catch (error) {
      return res.status(400).json({
        message: "something went wrong",
        error: error,
      });
    }
  }; 

  const editTask = async (req: Request, res: Response) => {

    let name: string = req.body.taskName;
    let description: string = req.body.description;

    try {
    let result = await Task.findByIdAndUpdate({_id : req.body.taskId},{$set :{name,description}});

      return res
        .status(200)
        .json({ message: "Tasks update sucessfully", data: result });
    } catch (error) {
      return res.status(400).json({
        message: "something went wrong",
        error: error,
      });
    }
  }; 

  const removeTask = async (req: Request, res: Response) => {
    try {
    let result = await Task.findByIdAndDelete({_id : req.body.taskId});
      return res
        .status(200)
        .json({ message: "Tasks deleted sucessfully", data: result });
    } catch (error) {
      return res.status(400).json({
        message: "something went wrong",
        error: error,
      });
    }
  }; 


export default { createTask,getAllTask,getTask,removeTask ,editTask};
