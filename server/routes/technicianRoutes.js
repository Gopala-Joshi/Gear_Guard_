const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');

// Route: POST /api/technicians
router.post('/', technicianController.createTechnician);

// Route: GET /api/technicians?companyId=1
router.get('/', technicianController.getTechnicians);

module.exports = router;