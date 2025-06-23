const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../config/db');
const verifyToken = require('../middleware/auth.middleware');
const validate = require('../middleware/validate');
const { commentsWOValidationRules } = require('../validators/commentswo.validator');

// GET /api/commentswo - obtener todos
router.get('/', verifyToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM CommentsWO');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: `Error al obtener comentarios: ${err.message}` });
  }
});

// GET /api/commentswo/search?description=texto - búsqueda LIKE
router.get('/search', verifyToken, async (req, res) => {
  const { Description } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Description', sql.NVarChar, `%${Description}%`)
      .query('SELECT * FROM CommentsWO WHERE Description LIKE @Description');

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: `Error al buscar comentarios: ${err.message}` });
  }
});

// GET /api/commentswo/:id - obtener por ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ID', sql.Int, id)
      .query('SELECT * FROM CommentsWO WHERE ID = @ID');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: `Error al obtener comentario: ${err.message}` });
  }
});

// POST /api/commentswo - crear nuevo
router.post('/', verifyToken, commentsWOValidationRules, validate, async (req, res) => {
  const { Description, IDWorkOrder } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Description', sql.NVarChar(100), Description)
      .input('IDWorkOrder', sql.Int, IDWorkOrder)
      .query('INSERT INTO CommentsWO (Description, IDWorkOrder) VALUES (@Description, @IDWorkOrder)');

    res.status(201).json({ message: 'Comentario creado correctamente' });
  } catch (err) {
    res.status(500).json({ message: `Error al crear comentario: ${err.message}` });
  }
});

// PUT /api/commentswo/:id - actualizar
router.put('/:id', verifyToken, commentsWOValidationRules, validate, async (req, res) => {
  const { id } = req.params;
  const { Description, IDWorkOrder } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ID', sql.Int, id)
      .input('Description', sql.NVarChar(100), Description)
      .input('IDWorkOrder', sql.Int, IDWorkOrder)
      .query('UPDATE CommentsWO SET Description = @Description, IDWorkOrder = @IDWorkOrder WHERE ID = @ID');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Comentario no encontrado para actualizar' });
    }

    res.json({ message: 'Comentario actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ message: `Error al actualizar comentario: ${err.message}` });
  }
});

// DELETE /api/commentswo/:id - eliminar
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('ID', sql.Int, id).query('DELETE FROM CommentsWO WHERE ID = @ID');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Comentario no encontrado para eliminar' });
    }

    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: `Error al eliminar comentario: ${err.message}` });
  }
});

module.exports = router;
