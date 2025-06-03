const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../config/db');
const verifyToken = require('../middleware/auth.middleware');

// GET /api/projects
router.get('/', verifyToken, async (req, res) => {
  try {
    console.log('Obteniendo proyectos...');
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT TOP 10 * FROM Projects');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error al obtener proyectos:', err);
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
});

module.exports = router;
