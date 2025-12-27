const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// POST /api/teams
router.post('/', teamController.createTeam);

// GET /api/teams?companyId=1
router.get('/', teamController.getTeams);

module.exports = router;