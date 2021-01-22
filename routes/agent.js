var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());


// validater = require('../validation/agentValidate');
agentController = require('../controllers/agent.controller');


// ,validater.validate('signUp')
router.post('/signup',agentController.signUp);
router.post('/profile',agentController.profileUpdate);
router.get('/mission-requests',agentController.missionRequests);
router.get('/testing',agentController.testing);

module.exports = router;
