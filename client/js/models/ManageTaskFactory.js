myAppModule.factory('ManageTaskFactory', function($http, $location, $localStorage){
	
	var tasks = [];
	var factory = {};

	factory.addNewTask = function(newTask, callback){
		parentId = $localStorage.User._id;
		$http.post('/addNewTask', newTask).success(function(output){
			callback(output);
		})
	}

	factory.get_all_Tasks = function(child, callback) {
		$http.get('/get_task/'+child._id).success(function(output){
			callback(output);
		})
	}

	factory.modifyTask = function(task, callback) {
		$http.post('/edit_task', task).success(function(output){
			console.log("after editing the task, output: ", output);
			callback(output);
		})
	}

	factory.deleteTask = function(task, callback) {
		$http.post('/del_task', task).success(function(output){
			callback(output);
		})
	}

	return factory;
})