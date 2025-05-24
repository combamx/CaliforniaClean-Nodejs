const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');


router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Customers');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Error al obtener clientes:', err);
    res.status(500).json({ message: 'Error al obtener clientes.' });
  }
});

module.exports = router;
