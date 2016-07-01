myAppModule.config(["$routeProvider", function ($routeProvider, $routeParams) {
  	$routeProvider
      .when('/', {
        templateUrl: './../static/partials/login.html'
      })
  		.when('/ParentDashboard', {
  			templateUrl: './../static/partials/parentDashboard.html'
  		})
      .when('/ChildDashboard', {
        templateUrl: './../static/partials/childDashboard.html'
      })
      .when('/ManageChildren', {
        templateUrl: './../static/partials/manageChild.html'
      })
      .when('/ManageTasks', {
        templateUrl: './../static/partials/manageTasks.html'
      })
  		// .when('/logout', {
  		// 	templateUrl: './../static/partials/login.html'
  		// })
      
  		.otherwise({
  			redirectTo: '/'
  		});
}]);