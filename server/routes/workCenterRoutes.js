const express = require('express');
const router = express.Router();
const wcController = require('../controllers/workCenterController');

router.post('/', wcController.createWorkCenter);
router.get('/', wcController.getWorkCenters);

module.exports = router;