const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../config/db');
const { customerValidationRules } = require('../validators/customer.validator');
const validate = require('../middleware/validate');


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

// POST /api/customers
router.post('/', customerValidationRules, validate, async (req, res) => {
  try {
    const { CompanyName, Email, Phone, Status } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('CompanyName', sql.NVarChar, CompanyName)
      .input('Address', sql.NVarChar, CompanyName)
      .input('City', sql.NVarChar, CompanyName)
      .input('Zip', sql.NVarChar, CompanyName)
      .input('Email', sql.NVarChar, Email)
      .input('Phone', sql.NVarChar, Phone)
      .input('Status', sql.Bit, Status)
      .query('INSERT INTO Customers (CompanyName, Address, City, Zip, Email, Phone, Status) VALUES (@CompanyName, @Address, @City, @Zip, @Email, @Phone, @Status)');
    res.status(201).json({ message: 'Cliente creado correctamente' });
  } catch (err) {
    console.error('Error al crear cliente:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
