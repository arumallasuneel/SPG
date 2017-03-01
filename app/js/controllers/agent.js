app.controller("agentCtrl", function($scope, $http, $window) {
	$scope.subscriberData = {};
	var init = function() {
		$scope.testfn();
	};
	$scope.testfn = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/agent/getSubscriberData/')
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.subscriberData = data;
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};
	init();
});
