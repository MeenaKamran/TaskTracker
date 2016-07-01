myAppModule.controller('ManageChildController', function(ManageChildFactory, $scope, $location, $localStorage){
	
	$scope.userName = $localStorage.User.lastName;

	ManageChildFactory.get_all_children(function(data){
		console.log("this is in ManageChildController, after get_all_children: ", data);
		$scope.children = data[0]._children;
	})

	$scope.addChild = function() {

		if (typeof($scope.newChild._id) == "undefined") {
			console.log("in addChild, typeof($scope.newChild._id): ", typeof($scope.newChild._id));
			ManageChildFactory.addNewChild($scope.newChild, function(result){
				ManageChildFactory.get_all_children(function(output){
					console.log("this is in ManageChildController, after addNewChild: ", output);
					$scope.children = output[0]._children;
				})
				$scope.newChild = "";
			})
		} 
		else {
			console.log("$scope.newChild._id: ",$scope.newChild._id);
			ManageChildFactory.modifyChild($scope.newChild, function(result){
				ManageChildFactory.get_all_children(function(output){
					$scope.children = output[0]._children;
					$scope.newChild = "";
					// console.log("scope.newChild is: ", $scope.newChild);
				})
			})
		}
		
	}

	$scope.delChild = function(child) {

		ManageChildFactory.deleteChild(child, function(result){
			ManageChildFactory.get_all_children(function(output){
				$scope.children = output[0]._children;
			})
		})
	}

	$scope.editChild = function(child){
		$scope.newChild = child;
	}

	$scope.logout = function() {
		console.log("in logout function");
		$localStorage.User = {};
		$location.url('/')
	}
})