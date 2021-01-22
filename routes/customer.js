var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());


validater = require('../validation/customerValidate');
customerController = require('../controllers/customer.controller');

router.post('/signup',customerController.signUp);
router.post('/profile',customerController.profileUpdate);
router.post('/quick-create-mission',validater.validate('quickCreateMission'),customerController.quickCreateMission);

// ,validater.validate('availableAgents')
router.post('/available-agents',customerController.availableAgents);
router.post('/book-now',validater.validate('bookNow'),customerController.bookNow);

router.get('/mission-details/:mission_id',customerController.missionDetails);


router.get('/card-details',customerController.cardDetails);
router.post('/card-details',validater.validate('cardDetails'),customerController.cardDetailsPost);


module.exports = router;
