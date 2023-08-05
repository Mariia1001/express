
const express = require('express');
const listEditRouter = express.Router();
const { handlePostPutErrors } = require('./error-handling');

let tasks = [
    {
        id: "123456",
        isCompleted: false,
        description: "Walk the dog"
    },
    
];


listEditRouter.post('/create', (req, res) => {
    const newTask = {
        id: Date.now().toString(),
        isCompleted: false,
        description: req.body.description
    };
    tasks.push(newTask);
    res.json(newTask);
});

listEditRouter.delete('/delete/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Tarea eliminada exitosamente.' });
});

listEditRouter.put('/update/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;

    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                ...updatedTask
            };
        }
        return task;
    });

    res.json({ message: 'Tarea actualizada exitosamente.' });
});

listEditRouter.use(handlePostPutErrors);

module.exports = listEditRouter;
module.exports = listEditRouter;
