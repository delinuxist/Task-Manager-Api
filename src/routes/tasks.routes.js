const router = require("express").Router();
const tasksController = require("../controllers/tasks.controllers");

// get all the tasks
router.get("/", tasksController.getAllTasks);

// create a new task
router.post("/", tasksController.createTask);

//get a single task
router.get("/:id", tasksController.getTaskById);

// update task
router.patch("/:id", tasksController.updateTaskById);

// delete task
router.delete("/:id", tasksController.deleteTaskById);

module.exports = router;
