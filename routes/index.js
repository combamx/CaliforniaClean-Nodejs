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
const changeOrders = require('../controllers/changeorders.controller');
const commentsWO = require('../controllers/commentswo.controller');
const documents = require('../controllers/documents.controller');
const printOrdenWorks = require('../controllers/printordenworks.controller');
const providers = require('../controllers/providers.controller');
const sellers = require('../controllers/sellers.controller');
const statusProjects = require('../controllers/statusProjects.controller');
const statusWorkOrders = require('../controllers/statusWorkOrders.controller');
const typeDocumentProjects = require('../controllers/typeDocumentProjects.controller');
const typesOrderWorks = require('../controllers/typesOrderWorks.controller');
const typesProjects = require('../controllers/typesProjects.controller');
const statusDates = require('../controllers/statusDates.controller');
const vlistProjects = require('../controllers/vlistProjects.controller');
const workers = require('../controllers/workers.controller');
const workOrdersAssigneds = require('../controllers/workOrdersAssigneds.controller');
const workOrdersOvertime = require('../controllers/workOrdersOvertime.controller');
const projects = require('../controllers/projects.controller');

const { login } = require('../controllers/auth.controller');



router.use('/customers', customers);
router.use('/buildings', buildings);
router.use('/changeorders', changeOrders);
router.use('/commentswo', commentsWO);
router.use('/documents', documents);
router.use('/printordenworks', printOrdenWorks);
router.use('/providers', providers);
router.use('/sellers', sellers);
router.use('/status-projects', statusProjects);
router.use('/status-work-orders', statusWorkOrders);
router.use('/type-document-projects', typeDocumentProjects);
router.use('/types-order-works', typesOrderWorks);
router.use('/types-projects', typesProjects);
router.use('/status-dates', statusDates);
router.use('/vlist-projects', vlistProjects);
router.use('/workers', workers);
router.use('/workOrdersAssigneds', workOrdersAssigneds);
router.use('/workOrdersOvertime', workOrdersOvertime);
router.use('/projects', projects);



router.post('/login', login);





module.exports = router;
