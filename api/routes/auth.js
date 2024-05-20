const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/login', (req, res) => {
    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).json({ message: 'Login e senha são obrigatórios' });
    }

    const query = 'SELECT * FROM users WHERE login = ? AND senha = ?';
    db.query(query, [login, senha], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        if (results.length > 0) {
            return res.status(200).json({ message: 'Login bem-sucedido', user: results[0] });
        } else {
            return res.status(401).json({ message: 'Login ou senha inválidos' });
        }
    });
});

module.exports = router;
