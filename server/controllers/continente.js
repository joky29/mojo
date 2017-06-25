'use strict';

var Models = require('../models'),
    contants = require('../contants'),
    DB = require('../modules/db_connector');


module.exports = {
	//db.pingodoce.find({name:{'$regex' : 'atum', '$options' : 'i'}}).sort({price: 1 })
    ingredients: function(req, res, next){
    	var recv = JSON.parse(req.body);
	var arr_ingredients = recv.ing;
	if(arr_ingredients == null)
		res.send('no ingredients', 500);
	else{
		var answer={};
		answer.ing=[];
		var counter = 1;
		for (var i in arr_ingredients){
			DB.continente.find({
				 "name": { "$regex": arr_ingredients[i], "$options": "i" } 

			},{sort:{"price":1}}).toArray(function(err,one){
				//answer.ing.push(one);
				var x = one.pop();
				answer.ing.push(x);
				if(counter++ == arr_ingredients.length){
					res.send(200,answer)
				}
			});
		}

	}
    }
};
