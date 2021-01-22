var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());



validater = require('../validation/customerValidate');
authController = require('../controllers/auth.controller');


router.post('/login',validater.validate('logIn'),authController.logIn);
router.get('/profile',authController.profile);
router.post('/veri-fy',authController.veriFy);
router.post('/change-password',validater.validate('changePassword'),authController.changePassword);
router.get('/',authController.indexRoute);

module.exports = router;
