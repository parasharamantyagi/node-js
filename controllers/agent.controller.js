const dateFormat = require("dateformat");
const db = require('../db1');
const halper = require('../halpers/halper');
var apiModel = require('../Model/model');
var agentTrait = require('../trait/AgentTrait');
const { body, validationResult } = require('express-validator');
var multer  = require('multer')
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/agent-images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});

var upload = multer({ storage: storage }).single('image');

module.exports = {
	signUp: signUp,
	profileUpdate: profileUpdate,
	missionRequests: missionRequests,
	testing: testing
};


async function missionRequests(req, res, next){
		const qb = await db.get_connection();
		try {
			const user = await jwt.verify(req.headers.authorization, accessTokenSecret);
			const agent = await qb.select('id').where({user_id: user.id}).limit(1).get('agents');

			const mission = await qb.select('*').where({agent_id: agent[0].id,'status': 0,payment_status: 0}).order_by('id', 'DESC').get('missions');
			
			res.status(200).json(halper.api_response(1,'mission requests',mission));
		} catch (err) {
			return res.json(halper.api_response(0,'This is invalid request',{}));
		} finally {
			qb.disconnect();
		}
}


function profileUpdate(req, res, next){
	jwt.verify(req.headers.authorization, accessTokenSecret, (err, user) => {
		if (err) {
			return res.json(halper.api_response(0,'This is invalid request',{}));
		}
		upload(req, res, function(err) {
			let inputData = req.body;
			if (err) {
				 return res.json("Something went wrong!");
			 }
			if(req.file){
				inputData.image = 'agent-images/'+req.file.filename;
			}
			apiModel.update('agents',{user_id : user.id},inputData)
			res.status(200).json(halper.api_response(1,'Agent profile update successfully',inputData));
		});
	});
}


function signUp(req, res, next){
	
		upload(req, res, function(err) {
			let inputData = req.body;
			var now = new Date();
			db.query("SELECT * FROM `users` WHERE `email` = '"+inputData.email+"'", function(err, rows, fields) {
				if (err) {
				  res.status(200).json(halper.api_response(0,'Something failed!',err));
				}else {
					if(rows.length >0){
						res.status(200).json(halper.api_response(0,'This email alerady exits',{}));
					}else{
						let userData = {
									email : inputData.email,
									created_at : dateFormat(now,'yyyy-m-d h:MM:ss'),
									updated_at : dateFormat(now,'yyyy-m-d h:MM:ss'),
									role_id : 2,
								}
						let agentData = {
									first_name : inputData.first_name,
									last_name : inputData.last_name,
									phone : inputData.phone,
									username: 'abcdef',
									avatar_icon: 'dummy_avatar.jpg',
									home_address : inputData.home_address,
									is_vehicle : inputData.is_vehicle,
									work_location_latitude : inputData.lat,
									work_location_longitude : inputData.long,
									status : 1,
									created_at : dateFormat(now,'yyyy-m-d h:MM:ss'),
									updated_at : dateFormat(now,'yyyy-m-d h:MM:ss')
								}
						if(req.file){
							agentData.identity_card = 'agent-files/'+req.file.filename;
						}
						apiModel.insertQuery('users',userData).then(function(result){
								agentData.user_id = result[0].id;
							apiModel.insert('agents',agentData);
						});
						res.status(200).json(halper.api_response(1,'request data',userData));
					}
				}
			});
		});
}


async function testing(req, res, next){
	const qb = await db.get_connection();
	const response = await qb.select(['user_id','first_name','last_name','phone']).where({id: 1}).get('agents');
	qb.disconnect();
	res.status(200).json(response);
}