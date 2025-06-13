const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../config/db');
const verifyToken = require('../middleware/auth.middleware');
const { projectValidationRules } = require('../validators/project.validator');
const validate = require('../middleware/validate');

// GET /api/projects
router.get('/', verifyToken, async (req, res) => {
  try {
    console.log('Obteniendo proyectos...');
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT TOP 10 * FROM Projects');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error al obtener proyectos:', err);
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
});

// POST /api/projects
router.post('/', verifyToken, projectValidationRules, validate, async (req, res) => {
  try {
    const {
      ProjectName, Address, City, Description, DateProject, Amount,
      RetentionsProject, Retentions, SellerProject, Selle, IDCustomer,
      IDSeller, IDProvide, IDTypeProject, IDTypeBuilding, AmountProvide,
      Inclusion, OCIP, Status
    } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('ProjectName', sql.NVarChar(100), ProjectName)
      .input('Address', sql.NVarChar(50), Address)
      .input('City', sql.NVarChar(50), City)
      .input('Description', sql.NVarChar(100), Description)
      .input('DateProject', sql.Date, DateProject)
      .input('Amount', sql.Money, Amount)
      .input('RetentionsProject', sql.Float, RetentionsProject)
      .input('Retentions', sql.Money, Retentions)
      .input('SellerProject', sql.Float, SellerProject)
      .input('Selle', sql.Money, Selle)
      .input('IDCustomer', sql.Int, IDCustomer)
      .input('IDSeller', sql.Int, IDSeller)
      .input('IDProvide', sql.Int, IDProvide)
      .input('IDTypeProject', sql.Int, IDTypeProject)
      .input('IDTypeBuilding', sql.Int, IDTypeBuilding)
      .input('AmountProvide', sql.Money, AmountProvide)
      .input('Inclusion', sql.NVarChar(sql.MAX), Inclusion)
      .input('OCIP', sql.NVarChar(50), OCIP)
      .input('Status', sql.Int, Status)
      .query(`INSERT INTO Projects (
        ProjectName, Address, City, Description, DateProject, Amount, RetentionsProject, Retentions,
        SellerProject, Selle, IDCustomer, IDSeller, IDProvide, IDTypeProject, IDTypeBuilding,
        AmountProvide, Inclusion, OCIP, Status
      ) VALUES (
        @ProjectName, @Address, @City, @Description, @DateProject, @Amount, @RetentionsProject, @Retentions,
        @SellerProject, @Selle, @IDCustomer, @IDSeller, @IDProvide, @IDTypeProject, @IDTypeBuilding,
        @AmountProvide, @Inclusion, @OCIP, @Status
      )`);

    res.status(201).json({ message: 'Proyecto creado exitosamente' });

  } catch (err) {
    console.error('Error al crear proyecto:', err);
    res.status(500).json({ message: 'Error al crear proyecto' });
  }
});

module.exports = router;
