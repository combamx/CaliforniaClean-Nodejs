const express = require("express");
const { poolPromise } = require("../config/db.js");

const router = express.Router();

// Placeholder de futuras rutas
router.get("/", (req, res) => {
  res.send("📦 CaliforniaClean API en Node.js");
});

router.get("/dbtest", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT TOP 5 * FROM Projects");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const customers = require('../controllers/customers.controller');
const buildings = require('../controllers/buildings.controller');

router.use('/customers', customers);
router.use('/buildings', buildings);

module.exports = router;
