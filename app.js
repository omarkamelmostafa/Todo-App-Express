var express = require('express');
var toDoController = require('./controllers/toDoController'); 

var app = express();
var PORT = 3000;

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));


// fire controllers
toDoController(app);

// listen to a port
app.listen(PORT);
console.log('You are listening to port ', PORT);





