import mongoose from "mongoose";

const Schema = mongoose.Schema;

let task = new Schema({
  name: String,
  description: String,
  //staus : Boolean,
  
 
});

const Task = mongoose.model("tasks", task);

export = Task;

