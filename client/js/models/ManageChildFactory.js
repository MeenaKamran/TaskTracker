myAppModule.factory('ManageChildFactory', function($http, $location, $localStorage){
	
	var children = [];
	var factory = {};
	var parentId;

	factory.addNewChild = function(newChild, callback){
		console.log("in ManageChildFactory, addNewChild");
		console.log("localStorage.User._id: ", $localStorage.User._id);
		parentId = $localStorage.User._id;
		$http.post('/addNewChild/'+parentId, newChild).success(function(output){
			callback(output);
		})
	}

	factory.get_all_children = function(callback) {
		console.log("in ManageChildFactory, get_all_children");
		parentId = $localStorage.User._id;
		$http.get('/get_children/'+$localStorage.User._id).success(function(output){
			children = output;
			console.log("output in get_all_children: ", children);
			callback(children);
		})
	}

	factory.deleteChild = function(child, callback) {
		console.log("in ManageChildFactory, deleteChild");
		parentId = $localStorage.User._id;
		$http.post('/del_child/'+child._id+'/'+parentId).success(function(output){
			console.log("after deleting the child, output: ", output);
			callback(output);
		})
	}

	factory.modifyChild = function(child, callback) {
		console.log("in ManageChildFactory, modifyChild");
		console.log("child is: ", child);
		$http.post('/edit_child', child).success(function(output){
			console.log("after editing the child, output: ", output);
			callback(output);
		})
	}

	return factory;
})