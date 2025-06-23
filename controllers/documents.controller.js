const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');
const { getQuery } = require('../utils/queryLoader');

// GET /api/documents
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = getQuery('Documents', 'all');
    const result = await pool.request().query('SELECT * FROM Documents');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Error al obtener documentos:', err);
    res.status(500).json({ message: 'Error al obtener Documents.' });
  }
});

module.exports = router;
