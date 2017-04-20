'use strict';

const qs      = require('querystring');
const request = require('request');


const token = 'SOME_TOKEN';
const apiUri = 'http://dsp.persona.ly/api/campaigns';


function getCampaigns (filter, callback) {
	let uri = apiUri + '?' + qs.stringify(Object.assign({token}, filter));

	request.get({
		url: uri,
		json: true
	}, function (err, resp, body) {
		if (err) {
			return callback(err);
		}

		return callback(null, body);
	});
}


let filter = {
	countries: 'GB,RU,IL',
	platforms: 'iphone,android'
};
getCampaigns(filter, (err, campaigns) => {
	console.log(campaigns);
});
