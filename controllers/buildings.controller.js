const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// GET /api/buildings
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Buildings');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Error al obtener buildings:', err);
    res.status(500).json({ message: 'Error al obtener buildings.' });
  }
});

module.exports = router;
