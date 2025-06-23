const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../config/db');
const { buildingValidationRules } = require('../validators/building.validator');
const verifyToken = require('../middleware/auth.middleware');
const validate = require('../middleware/validate');

// GET /api/buildings
router.get('/', verifyToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Buildings');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error al obtener buildings:', err.message);
    console.error(err.stack);
    res.status(500).json({ message: `Error al obtener buildings: ${err.message}` });
  }
});

// GET buildings by search on Description (LIKE)
router.get('/search', verifyToken, async (req, res) => {
  const { Description } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Description', sql.NVarChar, `%${Description}%`)
      .query('SELECT * FROM Buildings WHERE Description LIKE @Description');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Error en búsqueda de edificios', error: err.message });
  }
});

// GET building by ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ID', sql.Int, id)
      .query('SELECT * FROM Buildings WHERE ID = @ID');
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Edificio no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar edificio', error: err.message });
  }
});

// POST new building
router.post('/', verifyToken, buildingValidationRules, validate, async (req, res) => {
  const { Description, IDTypeProject, Order } = req.body;
  console.log('POST body:', req.body);

  console.log('Description:', Description);
  console.log('IDTypeProject:', IDTypeProject);
  console.log('Order:', Order);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Description', sql.NVarChar(100), Description)
      .input('IDTypeProject', sql.Int, IDTypeProject)
      .input('Order', sql.Int, Order)
      .query('INSERT INTO Buildings ([Description], IDTypeProject, [Order]) VALUES (@Description, @IDTypeProject, @Order)');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Edificio no creado' });
    }
    res.status(201).json({ message: 'Edificio creado correctamente' });
  } catch (err) {
    console.error('Error al crear edificio:', err);
    console.error(err.stack);
    res.status(500).json({ message: `Error al crear edificio: ${err.message}` });
  }
});

// PUT update building
router.put('/:id', verifyToken, buildingValidationRules, validate, async (req, res) => {
  const { id } = req.params;
  const { Description, IDTypeProject, Order } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ID', sql.Int, id)
      .input('Description', sql.NVarChar(100), Description)
      .input('IDTypeProject', sql.Int, IDTypeProject)
      .input('Order', sql.Int, Order)
      .query(`UPDATE Buildings SET [Description] = @Description, IDTypeProject = @IDTypeProject, [Order] = @Order WHERE ID = @ID`);
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Edificio no encontrado para actualizar' });
    }
    res.status(200).json({ message: 'Edificio actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar edificio:', err);
    console.error(err.stack);
    res.status(500).json({ message: `Error al actualizar edificio: ${err.message}` });
  }
});

// DELETE building
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('ID', sql.Int, id).query('DELETE FROM Buildings WHERE ID = @ID');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Edificio no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Edificio eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar edificio:', err);
    console.error(err.stack);
    res.status(500).json({ message: `Error al eliminar edificio: ${err.message}` });
  }
});

module.exports = router;
