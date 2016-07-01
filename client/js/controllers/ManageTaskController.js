myAppModule.controller('ManageTaskController', function(ManageTaskFactory, ManageChildFactory, $scope, $location, $localStorage){
	var childList = [];
	var childSelected;

	$scope.userName = $localStorage.User.lastName;
	
	ManageChildFactory.get_all_children(function(data){
		console.log("this is in ManageChildController, after get_all_children: ", data);
		$scope.children = data[0]._children;
		childList = data[0]._children;
		console.log("childList: ", childList);
		childSelected = childList[0];
		$scope.showTask(childSelected);
		$scope.newTask._userChild = childList[childList.length-1]._id
		// $scope.newTask=$scope.children[0];
	})

	$scope.whenOptions = [
		{name:'AM',value:'AM'},
		{name:'PM',value:'PM'},
		{name:'Anytime',value:'Anytime'}
	];
	$scope.newTask ={when: $scope.whenOptions[0].value};

	$scope.addTask = function() {
		if (typeof($scope.newTask._id) == "undefined") {
			ManageTaskFactory.addNewTask($scope.newTask, function(result){
				if (childSelected._id == $scope.newTask._userChild) {
					ManageTaskFactory.get_all_Tasks({_id:childSelected._id}, function(result){
						$scope.tasks = result[0]._taskList;
					})
				}
				$scope.newTask = "";
				$scope.newTask._userChild = childList[childList.length-1]._id;
				$scope.newTask ={when: $scope.whenOptions[0].value};

			})
		} else {
			ManageTaskFactory.modifyTask($scope.newTask, function(result){
				// if (childSelected._id == $scope.newTask._userChild) {
					ManageTaskFactory.get_all_Tasks({_id:childSelected._id}, function(result){
						$scope.tasks = result[0]._taskList;
					})
				// }
				$scope.newTask = "";
				$scope.newTask._userChild = childList[childList.length-1]._id;
				$scope.newTask ={when: $scope.whenOptions[0].value};
			})
		}
	}

	$scope.showTask = function(child) {

		childSelected = child;
		ManageTaskFactory.get_all_Tasks(child, function(result){
			$scope.tasks = result[0]._taskList;
		})
	}

	$scope.editTask = function(task) {
		$scope.newTask = task;
	}

	$scope.delTask = function(task) {
		ManageTaskFactory.deleteTask(task, function(result){
			ManageTaskFactory.get_all_Tasks({_id:childSelected._id}, function(result){
				$scope.tasks = result[0]._taskList;
			})
		})
	}

	$scope.logout = function() {
		console.log("in logout function");
		$localStorage.User = {};
		$location.url('/')
	}

})