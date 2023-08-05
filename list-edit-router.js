
const express = require('express');
const listEditRouter = express.Router();
const { handlePostPutErrors } = require('./error-handling');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const users = [
    {
        username: 'maria',
        password: 'maria12345'
    },
    {
        username: 'ana',
        password: 'ana2023'
    },
];

let tasks = [
    {
        id: "123456",
        isCompleted: false,
        description: "Walk the dog"
    },
    
];

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido.' });
        }
        req.user = decoded;
        next();
    });
};


listEditRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

listEditRouter.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Acceso a ruta protegida exitoso.', user: req.user });
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

