var restify = require('restify'),
    fs = require('fs'),
    config = require('./configure');


var server = restify.createServer({
    name: 'Ritzy',
});

server = config(server);

server.listen(5919, function() {
    console.log('%s listening at %s', server.name, server.url);
});
