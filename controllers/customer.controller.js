const dateFormat = require("dateformat");
const db = require('../db1');
const halper = require('../halpers/halper');
var apiModel = require('../Model/model');
const tables = require('../Model/table');
var agentTrait = require('../trait/AgentTrait');
const { body, validationResult } = require('express-validator');
var multer  = require('multer')
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/customer-images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});

var upload = multer({ storage: storage }).single('image');

module.exports = {
	signUp: signUp,
	profileUpdate: profileUpdate,
	quickCreateMission: quickCreateMission,
	availableAgents: availableAgents,
	bookNow: bookNow,
	missionDetails: missionDetails,
	cardDetails: cardDetails,
	cardDetailsPost: cardDetailsPost
};




function missionDetails(req, res, next){
	
	jwt.verify(req.headers.authorization, accessTokenSecret, (err, user) => {
		if (err) {
			return res.json(halper.api_response(0,'This is invalid request',{}));
		}
		apiModel.select('missions','*',{id : req.params.mission_id}).then(function(rows){
			if(rows.length > 0){
				// let response_mission = rows[0];
				
				// apiModel.select('missions','*',{id : req.params.mission_id}).then(function(rows){
					
				// });
				res.status(200).json(halper.api_response(1,'Mission detail',rows[0]));
				
			}else{
				res.status(200).json(halper.api_response(0,'No mission found',{}));
			}
			
		}).catch((err) => setImmediate(() => { throw err; }));
		
	});
}


function bookNow(req, res, next){
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(200).json(halper.api_response(0,'Missing failed',errors.array()));
	}
	jwt.verify(req.headers.authorization, accessTokenSecret, (err, user) => {
		if (err) {
			return res.json(halper.api_response(0,'This is invalid request',{}));
		}
		let inputData = req.body;
		apiModel.update('missions',{id : inputData.mission_id},{agent_id: inputData.agent_id});
	
		agentTrait.getMissionDetail(inputData.mission_id).then(function(rows){
			return res.status(200).json(halper.api_response(1,'Mission detail',rows));
		}).catch((err) => setImmediate(() => { throw err; }));
		
	});
}


function availableAgents(req, res, next){
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(200).json(halper.api_response(0,'Missing failed',errors.array()));
	}
	jwt.verify(req.headers.authorization, accessTokenSecret, (err, user) => {
		if (err) {
			return res.json(halper.api_response(0,'This is invalid request',{}));
		}
		let inputData = req.body;
		
		agentTrait.getAvailableAgents(inputData).then(function(rows){
			return res.status(200).json(halper.api_response(1,'available agents',{mission_id:inputData.mission_id,agents:rows}));
		}).catch((err) => setImmediate(() => { throw err; }));
		
	});
}


async function quickCreateMission(req, res, next){
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(200).json(halper.api_response(0,'Missing failed',errors.array()));
	}
	const qb = await db.get_connection();
	try {
			const user = await jwt.verify(req.headers.authorization, accessTokenSecret);
			
			let inputData = req.body;
				inputData.agent_type = halper.get_agent_type_list(inputData.agent_type);
			if(inputData.total_hours > 4){
				inputData.amount = halper.get_agent_rate(1,0) * inputData.total_hours;
			}else{
				inputData.amount = halper.get_agent_rate(1,0) * 4;
			}
			
			const agent = await qb.select('id').where({user_id: user.id}).limit(1).get('customers');
			inputData.customer_id = agent[0].id;
			
			const insert_id = await qb.returning('id').insert('missions', inputData);
			inputData.id = insert_id.insertId;
			
			
			return res.status(200).json(halper.api_response(1,'mission requests',inputData));
			
			
	} catch (err) {
		return res.json(halper.api_response(0,'This is invalid request',{}));
	} finally {
		qb.disconnect();
	}
}

function profileUpdate(req, res, next){
	
	const token  = req.headers.authorization;
	jwt.verify(token, accessTokenSecret, (err, user) => {
		if (err) {
			return res.json(halper.api_response(0,'This is invalid request',{}));
		}
		upload(req, res, function(err) {
			let inputData = req.body;
			if (err) {
				 return res.json("Something went wrong!");
			 }
			if(req.file){
				inputData.image = 'customer-images/'+req.file.filename;
			}
			apiModel.update('customers',{user_id : user.id},inputData)
			return res.status(200).json(halper.api_response(1,'customer profile update successfully',inputData));
		});
	});
}

function signUp(req, res, next){
	
	upload(req, res, async function(err) {
		let inputData = req.body;
			
		const qb = await db.get_connection();
		try {
		const users = await qb.select('id').where({email: inputData.email}).limit(1).get('users');
			if(users.length >0){
				res.status(200).json(halper.api_response(0,'This email alerady exits',{}));
			}else{
				var now = new Date();
					let userData = {
						email : inputData.email,
						password : halper.encrypt(inputData.password,'in'),
						created_at : dateFormat(now,'yyyy-m-d h:MM:ss'),
						updated_at : dateFormat(now,'yyyy-m-d h:MM:ss'),
						role_id : 1,
					}
					let customerData = {
						first_name : inputData.first_name,
						last_name : inputData.last_name,
						home_address : inputData.home_address,
						customer_type : inputData.customer_type,
						phone : inputData.phone,
						status : 1,
						created_at : dateFormat(now,'yyyy-m-d h:MM:ss'),
						updated_at : dateFormat(now,'yyyy-m-d h:MM:ss')
					}
				if(inputData.customer_type == 2){
					customerData.company_name = inputData.company_name;
				}
				if(req.file){
					customerData.image = 'customer-images/'+req.file.filename;
				}
				const insert_id = await qb.returning('id').insert(tables.users, userData);
				customerData.user_id = insert_id.insertId;
				qb.insert(tables.customers, customerData);
				return res.status(200).json(halper.api_response(1,'customer register successfully',customerData));
			}
		} catch (err) {
			return res.json(halper.api_response(0,'This is invalid request',{}));
		} finally {
			qb.disconnect();
		}
	});
}


async function cardDetails(req, res, next){
	const qb = await db.get_connection();
	try {
			const user = await jwt.verify(req.headers.authorization, accessTokenSecret);

			const card_detail = await qb.select(['name','card_number','expire_month','expire_year']).where({user_id: user.id}).get('card_details');
			res.status(200).json(halper.api_response(1,'card details',card_detail));
	} catch (err) {
		return res.json(halper.api_response(0,'This is invalid request',{}));
	} finally {
		qb.disconnect();
	}
}


async function cardDetailsPost(req, res, next){
	const qb = await db.get_connection();
	try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(200).json(halper.api_response(0,'Missing failed',errors.array()));
			}
			const user = await jwt.verify(req.headers.authorization, accessTokenSecret);
			let inputData = req.body;
			let save_data = inputData;
				save_data.user_id = user.id;
				
			const insert_id = await qb.returning('id').insert('card_details', save_data);
			inputData.id = insert_id.insertId;
			
			return res.status(200).json(halper.api_response(1,'card details',inputData));
	} catch (err) {
		return res.json(halper.api_response(0,'This is invalid request',{}));
	} finally {
		qb.disconnect();
	}
	
}


