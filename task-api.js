// task-api.js
const express = require('express');
const taskAPI = express.Router();

let tasks = [
    {
        id: '1',
        description: 'Buy groceries',
        isCompleted: false
    },
    {
        id: '2',
        description: 'Finish report',
        isCompleted: false
    },
   
];

// Crear una nueva tarea
taskAPI.post('/tasks', (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ error: 'La descripción es requerida.' });
    }
    const newTask = {
        id: String(tasks.length + 1),
        description,
        isCompleted: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Actualizar una tarea
taskAPI.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json(tasks[taskIndex]);
});

// Eliminar una tarea
taskAPI.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Tarea eliminada exitosamente.' });
});

// Listar todas las tareas
taskAPI.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Listar tareas completas e incompletas
taskAPI.get('/tasks/completed', (req, res) => {
    const completedTasks = tasks.filter(task => task.isCompleted);
    res.json(completedTasks);
});

taskAPI.get('/tasks/incomplete', (req, res) => {
    const incompleteTasks = tasks.filter(task => !task.isCompleted);
    res.json(incompleteTasks);
});

// Obtener una sola tarea
taskAPI.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    res.json(task);
});

module.exports = taskAPI;
