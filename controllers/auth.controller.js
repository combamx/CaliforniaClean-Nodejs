const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sql = require('mssql');
const { poolPromise } = require('../config/db');
const db = require('../config/db');

const secretKey = process.env.JWT_SECRET || 'californiaclean_super_secret';

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE Username = @username');

        const user = result.recordset[0];

        if (!user || !(await bcrypt.compare(password, user.Password))) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: user.Id, username: user.Username }, secretKey, {
            expiresIn: '4h',
        });

        res.json({ token });
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { login };

