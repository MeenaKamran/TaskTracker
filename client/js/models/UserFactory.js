myAppModule.factory('UserFactory', function($http, $location, $localStorage) {
	var children= [];
	var userParent = {};
	var factory = {};

	factory.registerParent = function(newUser, callback) {
		console.log("newUser is: ", newUser);
		$http.post('/register_parent', newUser).success(function(output){
			userParent = output;
			console.log("in UserFactory, registerParent, userParent is: ", userParent);
			callback(userParent);
		})
	}

	factory.loginParentUser = function(newParent, callback) {
		console.log("newParent: ", newParent);
		$http.get('/parent_dashboard/'+newParent.email+"/"+newParent.pswd).success(function(output){
			userParent = output;
			console.log("in UserFactory, loginParentUser, userParent is: ", userParent);
			callback(userParent);
		})
	}

	return factory;
})