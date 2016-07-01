myAppModule.controller('ParentController', function(ParentFactory, ManageChildFactory, ManageTaskFactory, $scope, $location, $localStorage, $routeParams){

	var childList =[];
	var childSelected;

	$scope.userName = $localStorage.User.lastName;
	console.log("in ParentController, localStorage.User.lastName ", $localStorage.User.lastName);
	$scope.logout = function() {
		console.log("in logout function");
		$localStorage.User = {};
		$location.url('/')
	}

	ManageChildFactory.get_all_children(function(data){
		console.log("this is in ParentController, after get_all_children: ", data);
		$scope.children = data[0]._children;
		childList = data[0]._children;
		console.log("childList: ", childList);
		childSelected = childList[0];
		$scope.showTask(childSelected);
		
	})

	$scope.showTask = function(child) {

		childSelected = child;
		ManageTaskFactory.get_all_Tasks(child, function(result){
			$scope.tasks = result[0]._taskList;
		})
	}

	$scope.addDate = function(task, dayOfWeek){
		
		var today = new Date("July 2, 2016 01:15:00");
		var weeekDay = today.getDay();
		var StartDate;
		var EndDate;
 
		console.log("today's date is: ", today);
		console.log("weeekDay is: ", weeekDay);
		switch(weeekDay)
		{
			case 0: 
			{
				console.log("today is Sunday");
				EndDate = moment(today).add(6,'d').toDate();
				StartDate = today;
				console.log("StartDate: ", StartDate);
				console.log("EndDate: ", EndDate);
				break;
			}
			case 1:
			{
				console.log("today is Monday");
				EndDate = moment(today).add(5, 'd').toDate();
				StartDate = moment(today).subtract(1,'d').toDate();
				console.log("StartDate: ", StartDate);
				console.log("EndDate: ", EndDate);
				break;
			}
			case 2:
			{
				console.log("today is Tuesday");
				StartDate = moment(today).subtract(2,'d').toDate();
				EndDate = moment(today).add(4,'d').toDate();
				console.log("StartDate: ", StartDate);
				console.log("EndDate: ", EndDate);
				break;
			}
			case 3: 
				console.log("today is Wednesday");
				StartDate = moment(today).subtract(3,'d').toDate();
				EndDate = moment(today).add(3,'d').toDate();
				console.log("StartDate: ", StartDate);
				console.log("EndDate: ", EndDate);
				break;
			case 4:
				console.log("today is Thursday");
				StartDate = moment(today).subtract(4,'d').toDate();
				EndDate = moment(today).add(2,'d').toDate();
				console.log("StartDate: ", StartDate);
				console.log("EndDate: ", EndDate);
				break;
			case 5:
			{
				console.log("today is Friday");
				StartDate = moment().subtract(5, 'days').toDate();
				EndDate = moment().add(1, 'days').toDate();
				console.log("StartDate: ", StartDate);
				console.log("EndDate: ", EndDate);
				break;
			}
			case 6:
				console.log("today is Saturday");
				StartDate = moment(today).subtract(6,'d').toDate();
				EndDate = moment(today).add(0,'d').toDate();
				console.log("StartDate: ", StartDate);
				console.log("EndDate: ", EndDate);
				break;
		}

		// switch(dayOfWeek):
		// {
		// 	case "Su":

		// 	case "Mo":

		// }
			


	}
})