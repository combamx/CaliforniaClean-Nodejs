const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// GET /api/status-work-orders
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM StatusWorkOrders');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Error al obtener StatusWorkOrders:', err);
    res.status(500).json({ message: 'Error al obtener StatusWorkOrders.' });
  }
});

module.exports = router;
