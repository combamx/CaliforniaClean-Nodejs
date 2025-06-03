const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// GET /api/types-projects
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM TypesProject');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Error al obtener TypesProjects:', err);
    res.status(500).json({ message: 'Error al obtener TypesProjects.' });
  }
});

module.exports = router;
