// error-handling.js

const handlePostPutErrors = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Cuerpo de solicitud vacío.' });
        }
        
        if (!req.body.hasOwnProperty('isCompleted') || !req.body.hasOwnProperty('description')) {
            return res.status(400).json({ error: 'Información inválida o faltante para crear una tarea.' });
        }
    }
    next();
};

module.exports = {
    handlePostPutErrors,
};
