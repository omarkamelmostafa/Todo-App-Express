var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
// Deprecation Warnings: to avoid, add some options like below
mongoose.connect('mongodb+srv://test:test@heisenberg.avrko.azure.mongodb.net/todo?retryWrites=true&w=majority', 
	{ 
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true 
	});

// create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
	item: String
});

// create a collection
var Todo = mongoose.model('todo', todoSchema);

// Test connection
// var itemOne = Todo({ item: 'Omar' }).save(function (err) {
// 	if(err) throw err;
// 	console.log('item saved');
// });


// var data = [{
// 	item: 'get milk'
// },{
// 	item: 'walk dog'
// },{
// 	item: 'kick some coding ass'
// }];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
	
	app.get('/todo', function (req, res) {
		// get data from mongo DB and pass itto view
		// Todo.find({item: 'Omar'}); // pull specific item
		// Todo.find({}); // pull out all items
		Todo.find({}, function (err, data) {
			if(err) throw err;
			res.render('todo', { data });
		});
		// before mongodb
		// res.render('todo', { data });
	});
	
	app.post('/todo', urlencodedParser, function (req, res) {
		// get data from the view and pass it to mongodb
		var newTodo = Todo(req.body).save(function(err, data){
			if(err) throw err;
			console.log('new todo task added');
			res.json(data);
		});
	
		// before mongodb
		// data.push(req.body);
		// res.json(data);
	});
	
	app.delete('/todo/:item', function (req, res) {
		// delete the requested item from mongodb
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
			if(err) throw err;
			res.json(data);
			console.log('task deleted');
		});

		// before mongodb
		// data = data.filter(function (todo) {
		// 	return todo.item.replace(/ /g, '-') !== req.params.item;
		// });
		// res.json(data);

	});



};