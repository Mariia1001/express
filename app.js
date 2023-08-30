
const express = require('express');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const taskAPI = require('./task-api');

const validateMethods = (req, res, next) => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!validMethods.includes(req.method)) {
        return res.status(400).json({ error: 'Método HTTP no válido.' });
    }
    next();
};

app.use(express.json());

app.use(validateMethods);
app.use('/api', taskAPI);

app.use('/tasks/view', listViewRouter);
app.use('/tasks/edit', listEditRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});



