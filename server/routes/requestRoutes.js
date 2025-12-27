const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/', requestController.createRequest);
router.get('/', requestController.getRequests);
router.patch('/:id/stage', requestController.updateStage); // Kanban update

module.exports = router;