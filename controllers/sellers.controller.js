const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');
const verifyToken = require('../middleware/auth.middleware');

// GET /api/sellers
router.get('/', verifyToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Sellers');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Error al obtener Sellers:', err);
    res.status(500).json({ message: 'Error al obtener Sellers.' });
  }
});

module.exports = router;
