var userParents = require('./../controllers/userParents.js');
var userChilds = require('./../controllers/userChilds.js');
var taskLists = require('./../controllers/taskLists.js');

module.exports = function(app){
	app.post('/register_parent', function(req, res){
		console.log("in server routes: /register_parent");
		console.log("req.body is: ",req.body);
		userParents.registerParent(req, res);
	});

	app.get('/parent_dashboard/:parentEmail/:parentPswd', function(req, res){
		console.log("in server routes: /parent_dashboard");
		userParents.loginParent(req, res);
	});

	app.post('/addNewChild/:parentId', function(req, res){
		console.log("/addNewChild/:parentId routes");
		console.log("req.params.parentId: ",req.params.parentId);
		console.log("req.body: ", req.body);
		userChilds.addChild(req, res);
	});

	app.get('/get_children/:parentId', function(req, res){
		console.log("in /get_children/:parentId routes");
		console.log("req.params.parentId: ", req.params.parentId);

		userChilds.getChildren(req, res);
	});

	app.post('/del_child/:childId/:parentId', function(req, res){
		console.log("in /del_child/:childId routes");
		console.log("req.params.childId: ", req.params.childId);
		console.log("req.params.parentId: ", req.params.parentId);
		userChilds.delChild(req, res);
	})

	app.post('/edit_child', function(req, res){
		console.log("in /edit_child routes");
		console.log("req.body: ", req.body);
		userChilds.editChild(req, res);
	})

	app.get('/get_task/:childId', function(req, res){
		console.log("in /get_task/:childId routes");
		console.log("req.params.childId is: ", req.params.childId);
		taskLists.showTasks(req, res);
	})

	app.post('/addNewTask', function(req, res){
		console.log("in /addNewTask routes");
		console.log("req.body: ", req.body);
		taskLists.addTask(req, res);
	})

	app.post('/edit_task', function(req, res){
		console.log("in /edit_task routes");
		console.log("req.body: ",req.body);
		taskLists.editTask(req, res);
	})

	app.post('/del_task', function(req, res){
		console.log("in /del_task routes");
		console.log("req.body: ", req.body);
		taskLists.deleteTask(req, res);
	})
} 