myAppModule.controller('UserController', function(UserFactory, $scope, $location, $localStorage) {
	
	$scope.registerUser = function() {
		$localStorage.User = {};
		console.log("in UserController, registerUser");
		if ($scope.newUser.pswd == $scope.newUser.confPswd) {
			console.log("Passwords matched!");
			console.log("newUser is: ",$scope.newUser);
			console.log("email and Passwords", $scope.newUser.email, $scope.newUser.pswd);
			UserFactory.registerParent($scope.newUser, function(data){
				$localStorage.User = data;
				console.log("this is data, after registerParent: ", data);

				$location.url('/ParentDashboard');
			});
		} else {
			$scope.errors = true;
			$scope.errors_msg = "Password and Confirmation Password are not same!"
		}
	}

	$scope.loginUser = function() {
		console.log("in UserController, loginUser");
		if ($scope.user.role="Parent") {
			console.log("$scope.user: ", $scope.user);
			UserFactory.loginParentUser($scope.user, function(data){
				$localStorage.User = data[0];
				console.log("this is data, after loginParentUser: ", $localStorage.User);
				console.log("this is localStorage.User.lastName", $localStorage.User.lastName);
				$location.url('/ParentDashboard');
			})
		}
		// } else {
		// 	UserFactory.loginChildUser($scope.user, function(data) {
		// 		$localStorage.User = data;
		// 		console.log("this is data, after loginChildUser: ", data);
		// 		$location.url('/ChildDashboard');
		// 	})
		// }
		 
	}




})