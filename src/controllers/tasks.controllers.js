const asyncWrapper = require("../middlewares/async");
const Task = require("../models/task.model");
const { createCustomError } = require("../errors/custom-error");

exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

exports.createTask = asyncWrapper(async (req, res) => {
  const task = new Task(req.body);

  await task.save();
  res.status(201).json({ task });
});

exports.getTaskById = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`Task with id: ${taskId} not found`, 404));
  }
  res.status(200).json({ task });
});

exports.updateTaskById = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const { name, completed } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    { name: name, completed: completed },
    { new: true, runValidators: true }
  );
  if (!task) {
    return res.status(404).json({ msg: `Task with id: ${taskId} not found` });
  }

  res.status(200).json({ task });
});

exports.deleteTaskById = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `Task with id: ${taskId} not found` });
    }
    res
      .status(200)
      .json({ msg: `Task with id: ${taskId} removed successfully` });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
