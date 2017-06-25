'use strict';

var Models = require('../models'),
    constants = require('../contants'),
    DB = require('../modules/db_connector');


module.exports = {
    
	//db.pantry.update({ingredient:"carne"},{$inc: {qty:1},$set: {ingredient:"carne"}},{upsert:true})
    add: function(req, res, next){
//   	var recv = JSON.parse(req.body);
	console.log(req.body);
	console.log(req.body.email);
	var ingredients_each_recipe = req.body.ing;
	var user_email = req.body.email;
	if(user_email == null)
		res.send('no ingredients added', 500);
	else{
		var ingredients_from_supermarket=[];
		var counter = 1;
		for (var i in ingredients_each_recipe){
			if(req.body.supermarket=='pingo'){			
   			DB.pingo.find({
                                 "name": { "$regex": ingredients_each_recipe[i], "$options": "i" }

                        },{sort:{"price":1}}).toArray(function(err,one){
                                //answer.ing.push(one);
                                var x = one.shift();
                                ingredients_from_supermarket.push(x);
                               if(counter++ == ingredients_each_recipe.length){
				for (var j in ingredients_from_supermarket){  
                			DB.pantry.update({
						 "email":user_email,
						 "ingredient": ingredients_from_supermarket[j].name,
"price":ingredients_from_supermarket[j].price,
"id":"7E 97 00 4"+j 

					},{$inc:{"qty":1},$set:{"email":user_email,"ingredient":ingredients_from_supermarket[j].name,"url":ingredients_from_supermarket[j].url,"price":ingredients_from_supermarket[j].price,"id":"7E 97 00 44"}},{upsert:true});

				}
						res.send(200,"ingredients added");
                	 	}
				
                        });
			}else{
				DB.continente.find({
                                 "name": { "$regex": arr_ingredients[i], "$options": "i" }

                        },{sort:{"price":1}}).toArray(function(err,one){
                                //answer.ing.push(one);
                                var x = one.shift();
                                ingredients_from_supermarket.push(x);
                               if(counter++ == arr_ingredients.length){
				for (var j in ingredients_from_supermarket){
                			DB.pantry.update({
						 "email":user_email,
						 "ingredient": ingredients_from_supermarket[j].name,
"price":ingredients_from_supermarket[j].price,
"id":"7E 97 00 4"+j 

					},{$inc:{"qty":1},$set:{"email":user_email,"ingredient":ingredients_from_supermarket[j].name,"url":ingredients_from_supermarket[j].url,"price":ingredients_from_supermarket[j].price,"id":"asdf"}},{upsert:true});

				}
						res.send(200,"ingredients added");
                	 	}
				
                        });

			}


		}
	}
     },
     decrease: function(req, res, next){
	var user_email = req.body.email;
	var ingredient_id = req.body.id;
	console.log(req.body);
	if(constants.TAGS.indexOf(ingredient_id)==-1 || user_email == null ){
		res.send('error on json sent',500);
	}
	else{
	// db.pantry.update({ingredient:"carne"},{$inc: {qty:-1}});
//	  console.log(req.body); 
	    DB.pantry.update({"email":user_email,"id":ingredient_id},{$inc: {qty:-1}}); 	      DB.pantry.update({"email":user_email,"qty":{"$lt":0}},{"$set":{"qty":0}});	
	    res.send('ingredient decremented',200);
	}
	
     },
     get: function(req, res ,next){
	var recv = JSON.parse(req.body);
     	DB.pantry.find({"email":recv.email}).toArray(function(err,data){
		if (err)
			res.send("no pantry for email "+req.body.email,500);
		else
			res.send(data,200);
	});
     }

};
