const dateFormat = require("dateformat");
const db = require('../db1');
const halper = require('../halpers/halper');
const apiModel = require('../Model/model');
const tables = require('../Model/table');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

module.exports = {
	logIn: logIn,
	veriFy: veriFy,
	profile: profile,
	changePassword: changePassword,
	indexRoute: indexRoute
};

function indexRoute(req, res, next){
	res.status(206).json(halper.api_response(1,'Welcome to beontime',{}));
}

function changePassword(req, res, next){
	
	jwt.verify(req.headers.authorization, accessTokenSecret, (err, user) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json(halper.api_response(0,'Missing failed',errors.array()));
		}
		
		if (err) {
			return res.json(halper.api_response(0,'This is invalid request',{}));
		}
		let inputData = req.body;
		
		if(inputData.new_password === inputData.confirm_password){
			
			db.get_connection(qb => {
				qb.select(['id','password']).where({id: user.id}).limit(1).get('users', (err, rows) => {
								qb.disconnect();
								if (err) {
								  res.status(500).json({ error: 'Something failed!' });
								}else {
									if(rows[0].password === halper.encrypt(inputData.current_password,'in')){
										
										qb.update('users', {password: halper.encrypt(inputData.new_password,'in')}, {id:user.id});
										
										res.status(200).json(halper.api_response(1,'Your password has been changed',{}));
									}else{
										res.status(206).json(halper.api_response(0,'Your old password does not match',{}));
									}
								}
							});	
				});
		}else{
			res.status(200).json(halper.api_response(0, "Your confirm_password does't match",inputData));
		}
		
		
	});
	
}

async function profile(req, res, next){
	const qb = await db.get_connection();
	try {
		const user = await jwt.verify(req.headers.authorization, accessTokenSecret);
		if(user.role_id === 1){
			let field_array = ['first_name','last_name','phone','image','home_address','customer_type','company_name'];
			const customers = await qb.select(field_array).where({user_id: user.id}).limit(1).get(tables.customers);
			halper.remove_empty(customers[0]);
			res.status(200).json(halper.api_response(1,'customer profile',customers[0]));
			
		}else if(user.role_id === 2){
			let field_array = [
								'first_name','last_name','phone','username','avatar_icon','image','identity_card',
								'social_security_number','cv','iban','agent_type','cnaps_number','home_address',
								'work_location_address','is_vehicle','is_subcontractor','supplier_company'
							];
			const agents = await qb.select(field_array).where({user_id: user.id}).limit(1).get(tables.agents);
			res.status(200).json(halper.api_response(1,'agent profile',agents[0]));

		}
	} catch (err) {
		return res.json(halper.api_response(0,'This is invalid request',{}));
	} finally {
		qb.disconnect();
	}
}



function logIn(req, res, next){
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(200).json(halper.api_response(0,'Missing failed',errors.array()));
	}
	
	let inputData = req.body;
	
	db.get_connection(qb => {
		qb.select(['id','role_id','email']).where({email: inputData.email,password: halper.encrypt(inputData.password,'in')}).limit(1).get('users', (err, rows) => {
			qb.disconnect();
			if (err) {
			  res.status(500).json({ error: 'Something failed!' })
			}else {
				if(rows.length >0){
					const accessToken = jwt.sign({ id: rows[0].id, email: rows[0].email, role_id: rows[0].role_id }, accessTokenSecret);
					res.status(200).json(halper.api_response(1,'User login successfully',{
						accessToken: accessToken,
						email: rows[0].email,
						role_name: halper.get_role_id(rows[0].role_id),
						role_id: rows[0].role_id
					}));
				}else{
					res.status(206).json(halper.api_response(0,'Email and password does not match',{}));
				}
			}
		});	
	});	
}

function veriFy(req, res, next){
	const token  = req.headers.authorization;
	jwt.verify(token, accessTokenSecret, (err, user) => {
		if (err) {
			return res.json('403');
		}
		res.status(200).json(user);
	});
}





