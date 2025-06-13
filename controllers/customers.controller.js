const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../config/db');
const { customerValidationRules } = require('../validators/customer.validator');
const verifyToken = require('../middleware/auth.middleware');
const validate = require('../middleware/validate');


router.get('/', verifyToken, async (req, res) => {
  
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Customers');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error al obtener clientes:', err.message);
    console.error(err.stack);
    res.status(500).json({ message: `Error al obtener clientes: ${err.message}` });
  }
});

// POST /api/customers
router.post('/', verifyToken, customerValidationRules, validate, async (req, res) => {
  const { CompanyName, Email, Phone, Status } = req.body;
  console.log('POST body:', req.body);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('CompanyName', sql.NVarChar, CompanyName)
      .input('Address', sql.NVarChar, CompanyName)
      .input('City', sql.NVarChar, CompanyName)
      .input('Zip', sql.NVarChar, CompanyName)
      .input('Email', sql.NVarChar, Email)
      .input('Phone', sql.NVarChar, Phone)
      .input('Status', sql.Bit, Status)
      .query('INSERT INTO Customers (CompanyName, Address, City, Zip, Email, Phone, Status) VALUES (@CompanyName, @Address, @City, @Zip, @Email, @Phone, @Status)');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Cliente no creado' });
    }

    res.status(201).json({ message: 'Cliente creado correctamente' });
  } catch (err) {
    console.error('Error al crear cliente:', err.message);
    console.error(err.stack);
    res.status(500).json({ message: `Error al cliente: ${err.message}` });
  }
});

// PUT update customer
router.put('/:id', verifyToken, customerValidationRules, validate, async (req, res) => {
  const { id } = req.params;
  const { CompanyName, Address, City, Zip, Phone, Status, Email } = req.body;

  console.log('PUT body:', req.body);
  console.log('PUT id param:', id);

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('ID', sql.Int, id)
      .input('CompanyName', sql.NVarChar(100), CompanyName)
      .input('Address', sql.NVarChar(100), Address)
      .input('City', sql.NVarChar(50), City)
      .input('Zip', sql.NVarChar(50), Zip)
      .input('Phone', sql.NVarChar(50), Phone)
      .input('Status', sql.Bit, Status)
      .input('Email', sql.NVarChar(100), Email)
      .query(`UPDATE Customers SET 
                CompanyName = @CompanyName, 
                Address = @Address, 
                City = @City, 
                Zip = @Zip, 
                Phone = @Phone, 
                Status = @Status, 
                Email = @Email 
              WHERE ID = @ID`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado para actualizar' });
    }
    res.status(200).json({ message: 'Cliente actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar cliente:', err.message);
    console.error(err.stack);
    res.status(500).json({ message: `Error al actualizar cliente: ${err.message}` });
  }
});

// DELETE customer
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  console.log('DELETE body:', req.body);
  console.log('DELETE id param:', id);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ID', sql.Int, id)
      .query('DELETE FROM Customers WHERE ID = @ID');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar cliente:', err.message);
    console.error(err.stack);
    res.status(500).json({ message: `Error al eliminar cliente: ${err.message}` });
  }
});


module.exports = router;
