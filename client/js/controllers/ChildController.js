myAppModule.controller('ChildController', function(ChildFactory, $scope, $location, $localStorage, $routeParams){

	$scope.logout = function() {
		console.log("in logout function");
		$localStorage.User = {};
		$location.url('/')
	}
})