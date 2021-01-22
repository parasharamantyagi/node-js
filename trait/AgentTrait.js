var db = require('../db');

module.exports = {
	getAvailableAgents: getAvailableAgents,
	getMissionDetail: getMissionDetail
};


function getAvailableAgents(object1) {
	return new Promise(function(resolve, reject) {
		let selected_fild = 'id,first_name,last_name,phone,avatar_icon,image,identity_card,social_security_number,cv,iban,agent_type,home_address,work_location_address,is_vehicle,';
		
		let sql = 'SELECT '+selected_fild;
		if(object1.latitude && object1.longitude) {
			sql += '(3959 * acos ( cos ( radians('+object1.latitude+') ) * cos( radians( work_location_latitude ) ) * cos( radians( work_location_longitude ) - radians('+object1.longitude+') ) + sin ( radians('+object1.latitude+') ) * sin( radians( work_location_latitude ) ) ) ) AS distance';
			sql += ' FROM `agents` WHERE `status` = 1 AND `available` = 1 HAVING distance < 100 ORDER BY distance LIMIT 0 , 20';
		}else{
			sql += '(3959 * acos ( cos ( radians(48.9957065) ) * cos( radians( work_location_latitude ) ) * cos( radians( work_location_longitude ) - radians(2.1129103) ) + sin ( radians(48.9957065) ) * sin( radians( work_location_latitude ) ) ) ) AS distance';
			sql += ' FROM `agents` WHERE `status` = 1 AND `available` = 1 HAVING distance < 500 ORDER BY distance LIMIT 0 , 20';
		}
		
		// console.log(sql);
		db.query(sql, function(err, rows, fields) {
			if (err) {
				return 'Something failed!';
			}else {
				if(rows.length >0){
					resolve(rows);
				}else{
					return false;
				}
			}
		});
	});
}


function getMissionDetail(mission_id) {
	return new Promise(function(resolve, reject) {
		
		let selected_fild = 'missions.id,missions.customer_id,missions.agent_id,missions.title,missions.location,missions.latitude,missions.longitude,';
			selected_fild += 'agents.first_name,agents.last_name,agents.phone,agents.username,missions.vat,';
			selected_fild += 'missions.start_date_time,missions.agent_type,missions.description,missions.quick_book,missions.vehicle_required,';
			selected_fild += 'missions.total_hours,missions.intervention,missions.repetitive_mission,missions.mission_finish_time,missions.time_intervel,';
			selected_fild += 'missions.amount,missions.payment_status,missions.assigned_at,missions.started_at,missions.ended_at';
		let sql = 'SELECT '+selected_fild+' FROM `missions` INNER JOIN `agents` ON missions.agent_id = agents.id WHERE missions.id= '+mission_id;
		
		db.query(sql, function(err, rows, fields) {
			if (err) {
				return 'Something failed!';
			}else {
				if(rows.length >0){
					resolve(rows);
				}else{
					return false;
				}
			}
		});
	});
}