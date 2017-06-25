'use strict'
var Models = require('../models'),
    UT = require('../modules/utils'),
    DB = require('../modules/db_connector'),
    ObjectId = require('mongodb')
    .ObjectID;



//ugly, rewrite later
var categories = ['']




module.exports = {
    all: function(req, res, next) {
        DB.recipes.find({}, {
                'name': 1,
                'img': 1,
                'url_recipe': 1
            })
            .toArray(function(err, all) {
                if (err) {
                    res.send('Internal server error', 500);
                } else {

                    return res.send(all);
                }
            });
    },
    category: function(req, res, next) {
        console.log(req.params.category);
        DB.recipes.find({
                    "category": req.params.category
                }, {

                })
                .toArray(function(err, all_cat) {
                    if (err)
                        res.send('Internal server error', 500);
                    else{
			var obj={}
			obj.all=all_cat;
                        return res.send(obj);
			}
                });
        
    },
    id: function(req, res, next) {
        console.log(req.params.id);
        if (req.params.id == null)
            res.send('undefined id', 500);
        else {
            DB.recipes.findOne({
                _id: ObjectId(req.params.id)
            }, function(err, one) {
                res.send(one);
            });
        }
    }
}
