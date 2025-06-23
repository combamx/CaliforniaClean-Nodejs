const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../config/db');
const { changeOrderValidationRules } = require('../validators/changeorder.validator');
const verifyToken = require('../middleware/auth.middleware');
const validate = require('../middleware/validate');

// GET all change orders
router.get('/', verifyToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM ChangeOrders');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error al obtener change orders:', err.message);
    res.status(500).json({ message: `Error al obtener change orders: ${err.message}` });
  }
});

// GET by Description like
router.get('/search', verifyToken, async (req, res) => {
  const { IDProject } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('IDProject', sql.NVarChar, `%${IDProject}%`)
      .query('SELECT * FROM ChangeOrders WHERE IDProject LIKE @IDProject');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Error en búsqueda de change orders', error: err.message });
  }
});

// GET by ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('ID', sql.Int, id).query('SELECT * FROM ChangeOrders WHERE ID = @ID');
    if (result.recordset.length === 0) return res.status(404).json({ message: 'ChangeOrder no encontrado' });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar change order', error: err.message });
  }
});

// POST create
router.post('/', verifyToken, changeOrderValidationRules, validate, async (req, res) => {
  console.log("Body Request", req.body);
  const { Clave, DateChange, Amount, IDStatusCO, IDWorkOrder, IDProject, Description, User, Status } = req.body;
  
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Clave', sql.Int, Clave)
      .input('DateChange', sql.Date, DateChange)
      .input('Amount', sql.Money, Amount)
      .input('IDStatusCO', sql.Int, IDStatusCO)
      .input('IDWorkOrder', sql.Int, IDWorkOrder)
      .input('IDProject', sql.Int, IDProject)
      .input('Description', sql.NVarChar(255), Description)
      .input('User', sql.NVarChar(50), User)
      .input('Status', sql.Bit, Status)
      .query(`INSERT INTO ChangeOrders (Clave, DateChange, Amount, IDStatusCO, IDWorkOrder, IDProject, Description, [User], Status)
              VALUES (@Clave, @DateChange, @Amount, @IDStatusCO, @IDWorkOrder, @IDProject, @Description, @User, @Status)`);
    res.status(201).json({ message: 'ChangeOrder creado correctamente' });
  } catch (err) {
    console.error('Error al crear change order:', err);
    res.status(500).json({ message: `Error al crear change order: ${err.message}` });
  }
});

// PUT update
router.put('/:id', verifyToken, changeOrderValidationRules, validate, async (req, res) => {
  const { id } = req.params;
  const { Clave, DateChange, Amount, IDStatusCO, IDWorkOrder, IDProject, Description, User, Status } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ID', sql.Int, id)
      .input('Clave', sql.Int, Clave)
      .input('DateChange', sql.Date, DateChange)
      .input('Amount', sql.Money, Amount)
      .input('IDStatusCO', sql.Int, IDStatusCO)
      .input('IDWorkOrder', sql.Int, IDWorkOrder)
      .input('IDProject', sql.Int, IDProject)
      .input('Description', sql.NVarChar(255), Description)
      .input('User', sql.NVarChar(50), User)
      .input('Status', sql.Bit, Status)
      .query(`UPDATE ChangeOrders SET Clave = @Clave, DateChange = @DateChange, Amount = @Amount,
              IDStatusCO = @IDStatusCO, IDWorkOrder = @IDWorkOrder, IDProject = @IDProject,
              Description = @Description, [User] = @User, Status = @Status WHERE ID = @ID`);
    if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'ChangeOrder no encontrado para actualizar' });
    res.status(200).json({ message: 'ChangeOrder actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ message: `Error al actualizar change order: ${err.message}` });
  }
});

// DELETE
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('ID', sql.Int, id).query('DELETE FROM ChangeOrders WHERE ID = @ID');
    if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'ChangeOrder no encontrado para eliminar' });
    res.status(200).json({ message: 'ChangeOrder eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: `Error al eliminar change order: ${err.message}` });
  }
});

module.exports = router;
