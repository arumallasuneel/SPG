app.controller("HomePageCtrl", function($scope, $http, $window, CONSTANTS) {
	$scope.offersList = [];
	var init = function() {
		$scope.getOffersList();
	};

	$scope.getOffersList = function() {
		$http
		.get(CONSTANTS.URL_PREFIX + '/Home/getOffersList')
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.offersList = data['offers_list'];
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, heders, config);
		});
	};

	$scope.getOfferDetailsById = function() {
		$http
		.get(CONSTANTS.URL_PREFIX + '/Home/getOfferDetailsById/'+$offer_Id)
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.offersList = data;
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, heders, config);
		});
	};

	$scope.getOfferDetailsByZip = function() {
		$http
		.get(CONSTANTS.URL_PREFIX + '/Home/getOfferDetailsByZip/'+$offer_zip)
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.offersList = data;
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, heders, config);
		});
	};

	init();
});